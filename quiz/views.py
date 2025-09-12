from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Q
import random
from .models import Question, Answer, Career, CareerRecommendation
from .serializers import QuestionSerializer, AnswerSerializer, CareerSerializer, CareerRecommendationSerializer
from .career_analysis import CareerAnalyzer

User = get_user_model()

class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    
    def get_queryset(self):
        questions = list(Question.objects.all())
        # Randomize the order of all questions
        random.shuffle(questions)
        return questions

class QuestionByCategoryView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    
    def get_queryset(self):
        category = self.kwargs['category']
        questions = list(Question.objects.filter(category=category))
        # Randomize the order of questions within the category
        random.shuffle(questions)
        return questions

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analyze_career_recommendations(request):
    """Analyze user's quiz responses and return career recommendations"""
    user = request.user
    print(f"Analyzing career recommendations for user: {user.username}")
    
    # Check if user has completed the quiz
    user_answers = Answer.objects.filter(user=user)
    print(f"Found {user_answers.count()} answers for user")
    
    if not user_answers.exists():
        print("No answers found for user")
        return Response({
            'error': 'No quiz responses found. Please complete the quiz first.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Analyze responses
    print("Starting career analysis...")
    analyzer = CareerAnalyzer()
    recommendations = analyzer.analyze_user_responses(user)
    print(f"Analysis complete. Found {len(recommendations)} recommendations")
    
    # Format response
    formatted_recommendations = []
    for rec in recommendations:
        career = rec['career']
        formatted_recommendations.append({
            'id': career.id,
            'name': career.name,
            'category': career.category,
            'description': career.description,
            'match_score': round(rec['score'], 1),
            'reasoning': rec['reasoning'],
            'required_skills': career.required_skills,
            'salary_range': career.salary_range,
            'growth_prospects': career.growth_prospects,
            'work_environment': career.work_environment
        })
    
    print(f"Returning {len(formatted_recommendations)} formatted recommendations")
    return Response({
        'recommendations': formatted_recommendations,
        'total_analyzed': len(recommendations)
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_recommendations(request):
    """Get saved career recommendations for the user"""
    user = request.user
    
    recommendations = CareerRecommendation.objects.filter(user=user).order_by('-match_score')[:5]
    
    serializer = CareerRecommendationSerializer(recommendations, many=True)
    return Response({
        'recommendations': serializer.data
    })

@api_view(['GET'])
def get_all_careers(request):
    """Get all available careers"""
    careers = Career.objects.all()
    serializer = CareerSerializer(careers, many=True)
    return Response({
        'careers': serializer.data
    })

@api_view(['GET'])
def test_endpoint(request):
    """Test endpoint to verify Django is working"""
    return Response({
        'message': 'Django backend is working!',
        'careers_count': Career.objects.count(),
        'questions_count': Question.objects.count()
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_disliked_careers(request):
    """Get careers the user has disliked"""
    user = request.user
    analyzer = CareerAnalyzer()
    disliked_careers = analyzer.get_user_disliked_careers(user)
    
    return Response({
        'disliked_careers': disliked_careers
    })
