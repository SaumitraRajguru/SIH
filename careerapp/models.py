from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import json

class Career(models.Model):
    """
    Model to represent a career field, like 'Computer Science Engineering'.
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    slug = models.SlugField(max_length=255, unique=True)
    pros = models.JSONField(default=list, help_text="List of strings for career pros.")
    cons = models.JSONField(default=list, help_text="List of strings for career cons.")
    
    def __str__(self):
        return self.name

class Question(models.Model):
    """
    Model for quiz questions with weighted trait mappings.
    Each question choice is mapped to a career and a score.
    """
    question_text = models.TextField()
    academic_level = models.CharField(max_length=10, choices=[('10th', 'Class 10th'), ('12th', 'Class 12th')])
    stream = models.CharField(max_length=50, help_text="e.g., Engineering, Medicine")
    
    def __str__(self):
        return f"Q: {self.question_text[:50]}..."

class Choice(models.Model):
    """
    Choices for each question.
    'scores' is a JSONField mapping career slugs to their scores for this choice.
    """
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=255)
    backreason = models.TextField(blank=True, null=True)
    scores = models.JSONField(default=dict, help_text="A JSON object mapping career slugs to score values.")
    
    def __str__(self):
        return self.choice_text

class QuizAttempt(models.Model):
    """
    Stores a user's single quiz attempt.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    academic_level = models.CharField(max_length=10, choices=[('10th', 'Class 10th'), ('12th', 'Class 12th')])
    stream = models.CharField(max_length=50)
    results_data = models.JSONField(default=dict, help_text="Raw data of quiz scores per career.")
    recommendations = models.JSONField(default=list, help_text="Final top N recommendations as a list of dicts.")

    def __str__(self):
        return f"Quiz attempt by {self.user.username if self.user else 'Anonymous'} on {self.timestamp.date()}"

class CareerCart(models.Model):
    """
    Allows users to save and compare their quiz results.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    saved_attempts = models.ManyToManyField(QuizAttempt, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s Career Cart"