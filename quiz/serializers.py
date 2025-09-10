from rest_framework import serializers
from .models import Question, Answer

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'category', 'created_at']

class AnswerSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(source='question.text', read_only=True)
    question_category = serializers.CharField(source='question.category', read_only=True)
    
    class Meta:
        model = Answer
        fields = ['id', 'question', 'question_text', 'question_category', 'user', 'choice', 'created_at']
        read_only_fields = ['user']
