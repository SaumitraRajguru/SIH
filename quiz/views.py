# quiz/views.py
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
import environ
import os
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer
from .utils import score_quiz
from django.utils import timezone
import random

User = get_user_model()
env = environ.Env()
environ.Env.read_env()

# --- EXISTING CODE (DO NOT CHANGE) ---

class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionByCategoryView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    
    def get_queryset(self):
        category = self.kwargs['category']
        return Question.objects.filter(category=category)

class AnswerCreateView(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserAnswersView(generics.ListAPIView):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Answer.objects.filter(user=self.request.user)

@api_view(['GET'])
def quiz_stats(request):
    """Get quiz statistics"""
    total_questions = Question.objects.count()
    questions_by_category = {}
    
    for category, _ in Question.CATEGORY_CHOICES:
        count = Question.objects.filter(category=category).count()
        questions_by_category[category] = count
    
    return Response({
        'total_questions': total_questions,
        'questions_by_category': questions_by_category,
        'choice_options': [choice[0] for choice in Answer.CHOICE_CHOICES]
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz_answers(request):
    """Submit multiple quiz answers at once"""
    answers_data = request.data.get('answers', [])
    user = request.user
    
    created_answers = []
    errors = []
    
    for answer_data in answers_data:
        try:
            question_id = answer_data.get('question')
            choice = answer_data.get('choice')
            
            if not question_id or not choice:
                errors.append(f"Missing question or choice for answer: {answer_data}")
                continue
                
            answer, created = Answer.objects.get_or_create(
                question_id=question_id,
                user=user,
                defaults={'choice': choice}
            )
            
            if not created:
                answer.choice = choice
                answer.save()
            
            created_answers.append(AnswerSerializer(answer).data)
            
        except Exception as e:
            errors.append(f"Error processing answer {answer_data}: {str(e)}")
    
    return Response({
        'created_answers': created_answers,
        'errors': errors,
        'total_submitted': len(created_answers)
    })

# --- DIALOGFLOW WEBHOOK CODE (ADD THIS PART) ---

# Webhook security decorator
def dialogflow_webhook_secure(view_func):
    def _wrapped_view(request, *args, **kwargs):
        webhook_secret = request.headers.get('X-DIALOGFLOW-WEBHOOK-SECRET')
        expected_secret = env('DIALOGFLOW_WEBHOOK_SECRET')
        if not webhook_secret or webhook_secret != expected_secret:
            return HttpResponseForbidden("Invalid webhook secret.")
        return view_func(request, *args, **kwargs)
    return _wrapped_view

@method_decorator(csrf_exempt, name='dispatch')
@method_decorator(dialogflow_webhook_secure, name='dispatch')
class DialogflowWebhookView(View):
    def post(self, request, *args, **kwargs):
        try:
            req = json.loads(request.body.decode('utf-8'))
            intent_name = req['queryResult']['intent']['displayName']
            params = req['queryResult']['parameters']
            
            try:
                user = User.objects.get(username='dialogflow_user')
            except User.DoesNotExist:
                user = User.objects.create_user(username='dialogflow_user', password='password123')

            if intent_name == 'start_quiz':
                return self.start_quiz(user, req)
            elif intent_name == 'answer_capture':
                return self.answer_capture(user, params, req)
            elif intent_name == 'finish_quiz':
                return self.finish_quiz(user, req)
            elif intent_name == 'explain_result':
                return self.explain_result(user, req)
            else:
                return JsonResponse({"fulfillmentText": "Sorry, I'm not sure how to handle that."})

        except json.JSONDecodeError:
            return JsonResponse({"fulfillmentText": "Invalid JSON format."}, status=400)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"fulfillmentText": f"An unexpected error occurred: {str(e)}"}, status=500)

    def start_quiz(self, user, req):
        Answer.objects.filter(user=user).delete()
        
        first_question = Question.objects.order_by('?').first()
        if first_question:
            response_text = f"Welcome! Let's start the quiz. First question: {first_question.text}"
            
            context_name = f"projects/{req['session'].split('/')[1]}/agent/sessions/{req['session'].split('/')[3]}/contexts/awaiting_answer"
            output_context = {
                "name": context_name,
                "lifespanCount": 1,
                "parameters": {
                    "question_id": first_question.id
                }
            }
            return JsonResponse({
                "fulfillmentText": response_text,
                "outputContexts": [output_context]
            })
        else:
            return JsonResponse({"fulfillmentText": "Sorry, no questions are available at the moment."})

    def answer_capture(self, user, params, req):
    # Accept both 'AnswerScale' and 'answer'
        answer_text = params.get('AnswerScale') or params.get('answer')
        if not answer_text:
            return JsonResponse({
                "fulfillmentText": "I didn’t catch your answer. Could you repeat?"
            })

        # Safely get context
        context = None
        for c in req['queryResult'].get('outputContexts', []):
            if 'awaiting_answer' in c['name'] and 'question_id' in c.get('parameters', {}):
                context = c
                break

        if not context:
            return JsonResponse({"fulfillmentText": "I lost track of the quiz. Please start again."})

        prev_question_id = context['parameters'].get('question_id')

        try:
            prev_question = Question.objects.get(id=prev_question_id)
        except Question.DoesNotExist:
            return JsonResponse({"fulfillmentText": f"Question {prev_question_id} not found. Please restart."})

        # Save/update answer
        Answer.objects.update_or_create(
            user=user,
            question=prev_question,
            defaults={'choice': answer_text}
        )

        # Progress tracking
        answered_count = Answer.objects.filter(user=user).count()
        total_questions = Question.objects.count()

        if answered_count >= total_questions:
            return self.finish_quiz(user, req)

        answered_q_ids = Answer.objects.filter(user=user).values_list('question_id', flat=True)
        next_question = Question.objects.exclude(id__in=answered_q_ids).order_by('?').first()

        if next_question:
            response_text = f"Next: {next_question.text}"
            context_name = f"{req['session']}/contexts/awaiting_answer"
            output_context = {
                "name": context_name,
                "lifespanCount": 5,
                "parameters": {"question_id": next_question.id}
            }
            return JsonResponse({
                "fulfillmentText": response_text,
                "outputContexts": [output_context]
            })
        else:
            return self.finish_quiz(user, req)


    def finish_quiz(self, user, req):
        results = score_quiz(user)
        top_category = results['recommendation'][0][0]
        
        response_text = f"Great! You have completed the quiz. Based on your answers, your top recommended career field is: {top_category}."
        
        # Add quick replies for a better conversational experience
        fulfillment_messages = [
            {
                "text": {
                    "text": [response_text]
                }
            },
            {
                "payload": {
                    "richContent": [
                        [
                            {
                                "type": "chips",
                                "options": [
                                    {"text": "Explain my result"},
                                    {"text": "Show me colleges"},
                                ]
                            }
                        ]
                    ]
                }
            }
        ]
        
        return JsonResponse({
            "fulfillmentText": response_text,
            "fulfillmentMessages": fulfillment_messages,
            "payload": {
                "recommendation": results['recommendation']
            }
        })

    def explain_result(self, user, req):
        results = score_quiz(user)
        if not results['recommendation']:
            return JsonResponse({"fulfillmentText": "You haven't completed the quiz yet. Please start the quiz to see your results."})

        top_category = results['recommendation'][0][0]
        top_score = results['recommendation'][0][1]['score']
        
        explanation_text = (
            f"Your top recommended field is **{top_category}**. "
            f"You scored highly in this area, indicating a strong interest and potential aptitude based on your answers."
        )

        return JsonResponse({
            "fulfillmentText": explanation_text,
            "payload": {
                "recommendation": results['recommendation']
            }
        })