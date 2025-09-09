from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # Import IsAuthenticated
from .models import Question, QuizAttempt, Career, CareerCart
from .serializers import (
    QuestionSerializer,
    QuizSubmissionSerializer,
    QuizAttemptSerializer,
    CareerCartSerializer,
    CareerComparisonSerializer
)
from .utils import quiz_scoring_logic  # Corrected relative import
from django.shortcuts import get_object_or_404
from django.db import transaction

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing quiz questions.
    """
    serializer_class = QuestionSerializer

    def get_queryset(self):
        """
        Optionally filters questions by academic level and stream.
        """
        queryset = Question.objects.all()
        academic_level = self.request.query_params.get('level')
        stream = self.request.query_params.get('stream')
        if academic_level:
            queryset = queryset.filter(academic_level=academic_level)
        if stream:
            queryset = queryset.filter(stream=stream)
        return queryset.prefetch_related('choices')

class QuizSubmissionView(APIView):
    """
    API endpoint to receive quiz answers, score them, and return a recommendation.
    """
    serializer_class = QuizSubmissionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        academic_level = serializer.validated_data['academic_level']
        stream = serializer.validated_data['stream']
        answers = serializer.validated_data['answers']

        try:
            # The core scoring logic is handled in a utility function
            final_scores, recommendations = quiz_scoring_logic(answers)
            
            with transaction.atomic():
                # Save the quiz attempt to the database
                attempt = QuizAttempt.objects.create(
                    user=request.user if request.user.is_authenticated else None,
                    academic_level=academic_level,
                    stream=stream,
                    results_data=final_scores,
                    recommendations=recommendations
                )
            
            # Return the recommendations to the user
            return Response(
                {"recommendations": recommendations, "attempt_id": attempt.id},
                status=status.HTTP_200_OK
            )
        except Question.DoesNotExist:
            return Response({"error": "Invalid question ID provided."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ResultSaveToCartView(APIView):
    """
    API to save a specific quiz result to the user's career cart.
    Requires user to be logged in.
    """
    permission_classes = [IsAuthenticated]  # Apply IsAuthenticated here

    def post(self, request, *args, **kwargs):
        attempt_id = request.data.get('attempt_id')
        if not attempt_id:
            return Response({"error": "Attempt ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        attempt = get_object_or_404(QuizAttempt, id=attempt_id)
        
        cart, created = CareerCart.objects.get_or_create(user=request.user)
        cart.saved_attempts.add(attempt)
        
        return Response({"message": "Result saved to cart successfully."}, status=status.HTTP_200_OK)

class CareerCartView(generics.RetrieveAPIView):
    """
    API to view the user's saved results in their career cart.
    """
    serializer_class = CareerCartSerializer
    permission_classes = [IsAuthenticated] # Ensures user is logged in
    
    def get_object(self):
        # Fetches the user's cart or raises a 404
        return get_object_or_404(CareerCart, user=self.request.user)

class CareerComparisonView(APIView):
    """
    API to compare two saved career results from the cart.
    """
    serializer_class = CareerComparisonSerializer
    permission_classes = [IsAuthenticated]  # Apply IsAuthenticated here

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        attempt_ids = serializer.validated_data['attempt_ids']
        
        try:
            # Fetch the two quiz attempts
            attempt1 = get_object_or_404(QuizAttempt, id=attempt_ids[0], user=request.user)
            attempt2 = get_object_or_404(QuizAttempt, id=attempt_ids[1], user=request.user)
            
            # Get the career details for the top recommendations of each attempt
            rec1_details = [
                {'name': rec['name'], 'score': rec['score'], **Career.objects.get(slug=rec['slug']).get_details()}
                for rec in attempt1.recommendations
            ]
            rec2_details = [
                {'name': rec['name'], 'score': rec['score'], **Career.objects.get(slug=rec['slug']).get_details()}
                for rec in attempt2.recommendations
            ]
            
            comparison_data = {
                "attempt_1_id": attempt1.id,
                "attempt_1_recommendations": rec1_details,
                "attempt_2_id": attempt2.id,
                "attempt_2_recommendations": rec2_details,
                "timestamp_1": attempt1.timestamp,
                "timestamp_2": attempt2.timestamp,
            }

            return Response(comparison_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": "Comparison failed. Check provided IDs."}, status=status.HTTP_400_BAD_REQUEST)

class FinalSummaryView(generics.ListAPIView):
    """
    API to provide a final summary of the user's strongest career fits
    based on all their quiz attempts.
    """
    serializer_class = QuizAttemptSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get all quiz attempts for the authenticated user and order by timestamp
        return QuizAttempt.objects.filter(user=self.request.user).order_by('-timestamp')

    def get_serializer_context(self):
        # Pass the request context to the serializer if needed
        return {'request': self.request}

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        if not queryset.exists():
            return Response({"message": "No quiz attempts found for this user."}, status=status.HTTP_200_OK)

        # Aggregate all results data
        aggregated_scores = {}
        for attempt in queryset:
            for career_slug, score in attempt.results_data.items():
                aggregated_scores[career_slug] = aggregated_scores.get(career_slug, 0) + score
        
        # Sort and get the top 3 overall recommendations
        sorted_scores = sorted(aggregated_scores.items(), key=lambda item: item[1], reverse=True)
        top_recommendations = sorted_scores[:3]
        
        final_summary = []
        for slug, score in top_recommendations:
            try:
                career = Career.objects.get(slug=slug)
                final_summary.append({
                    "name": career.name,
                    "slug": career.slug,
                    "total_score": score,
                    "description": career.description,
                })
            except Career.DoesNotExist:
                continue
        
        return Response({"final_summary": final_summary}, status=status.HTTP_200_OK)