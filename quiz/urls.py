from django.urls import path
from .views import (
    QuestionListView, 
    QuestionByCategoryView,
    AnswerCreateView, 
    UserAnswersView,
    quiz_stats,
    submit_quiz_answers
)
from .views import DialogflowWebhookView  # <-- Add this line
urlpatterns = [
    # Questions
    path('questions/', QuestionListView.as_view(), name='question-list'),
    path('questions/<str:category>/', QuestionByCategoryView.as_view(), name='question-by-category'),
    path('webhook/', DialogflowWebhookView.as_view(), name='dialogflow-webhook'),
    
    # Answers
    path('answers/', AnswerCreateView.as_view(), name='answer-create'),
    path('answers/my/', UserAnswersView.as_view(), name='user-answers'),
    path('answers/submit/', submit_quiz_answers, name='submit-quiz-answers'),
    
    # Stats
    path('stats/', quiz_stats, name='quiz-stats'),
]
