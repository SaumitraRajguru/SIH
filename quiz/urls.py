from django.urls import path
from .views import (
    QuestionListView, 
    QuestionByCategoryView,
    AnswerCreateView, 
    UserAnswersView,
    quiz_stats,
    submit_quiz_answers,
    analyze_career_recommendations,
    get_user_recommendations,
    get_all_careers,
    get_disliked_careers,
    test_endpoint
)

urlpatterns = [
    # Questions
    path('questions/', QuestionListView.as_view(), name='question-list'),
    path('questions/<str:category>/', QuestionByCategoryView.as_view(), name='question-by-category'),
    
    # Answers
    path('answers/', AnswerCreateView.as_view(), name='answer-create'),
    path('answers/my/', UserAnswersView.as_view(), name='user-answers'),
    path('answers/submit/', submit_quiz_answers, name='submit-quiz-answers'),
    
    # Stats
    path('stats/', quiz_stats, name='quiz-stats'),
    
    # Career Analysis
    path('analyze/', analyze_career_recommendations, name='analyze-career-recommendations'),
    path('recommendations/', get_user_recommendations, name='get-user-recommendations'),
    path('careers/', get_all_careers, name='get-all-careers'),
    path('disliked-careers/', get_disliked_careers, name='get-disliked-careers'),
    path('test/', test_endpoint, name='test-endpoint'),
]
