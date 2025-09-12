from rest_framework import serializers
from .models import Question, Answer, Career, CareerRecommendation

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

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = ['id', 'name', 'category', 'description', 'required_skills', 'interest_keywords', 
                 'degree_requirements', 'salary_range', 'growth_prospects', 'work_environment', 'created_at']

class CareerRecommendationSerializer(serializers.ModelSerializer):
    career_name = serializers.CharField(source='career.name', read_only=True)
    career_category = serializers.CharField(source='career.category', read_only=True)
    career_description = serializers.CharField(source='career.description', read_only=True)
    career_skills = serializers.JSONField(source='career.required_skills', read_only=True)
    
    class Meta:
        model = CareerRecommendation
        fields = ['id', 'career', 'career_name', 'career_category', 'career_description', 
                 'career_skills', 'match_score', 'reasoning', 'created_at']
        read_only_fields = ['user']
