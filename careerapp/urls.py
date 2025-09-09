from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    QuestionViewSet,
    QuizSubmissionView,
    ResultSaveToCartView,
    CareerCartView,
    CareerComparisonView,
    FinalSummaryView
)

router = DefaultRouter()
router.register(r'questions', QuestionViewSet, basename='questions')

urlpatterns = [
    # API endpoints for quiz logic and results
    path('', include(router.urls)),
    path('quiz/submit/', QuizSubmissionView.as_view(), name='quiz-submit'),
    path('results/save/', ResultSaveToCartView.as_view(), name='save-result'),
    path('cart/', CareerCartView.as_view(), name='career-cart'),
    path('compare/', CareerComparisonView.as_view(), name='compare-results'),
    path('summary/', FinalSummaryView.as_view(), name='final-summary'),
]