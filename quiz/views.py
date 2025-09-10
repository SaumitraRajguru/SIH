from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer

User = get_user_model()

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
                
            # Get or create answer
            answer, created = Answer.objects.get_or_create(
                question_id=question_id,
                user=user,
                defaults={'choice': choice}
            )
            
            if not created:
                # Update existing answer
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
