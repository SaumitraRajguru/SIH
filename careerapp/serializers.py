from rest_framework import serializers
from .models import Career, Question, Choice, QuizAttempt, CareerCart

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = ['id', 'name', 'description', 'slug', 'pros', 'cons']

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'choice_text']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'choices']

class QuizSubmissionSerializer(serializers.Serializer):
    """
    Serializer to handle incoming quiz answers.
    """
    academic_level = serializers.CharField(max_length=10)
    stream = serializers.CharField(max_length=50)
    answers = serializers.JSONField(
        help_text="A JSON object where keys are question IDs and values are choice IDs."
    )

class QuizAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAttempt
        fields = ['id', 'timestamp', 'academic_level', 'stream', 'recommendations']

class CareerCartSerializer(serializers.ModelSerializer):
    saved_attempts = QuizAttemptSerializer(many=True, read_only=True)

    class Meta:
        model = CareerCart
        fields = ['saved_attempts']

class CareerComparisonSerializer(serializers.Serializer):
    """
    Serializer to compare two quiz results side-by-side.
    """
    attempt_ids = serializers.ListField(
        child=serializers.IntegerField(),
        min_length=2,
        max_length=2,
        help_text="A list of two QuizAttempt IDs to compare."
    )