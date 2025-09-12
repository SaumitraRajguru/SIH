from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import json

User = get_user_model()

class Question(models.Model):
    CATEGORY_CHOICES = [
        ('interest', 'Interest'),
        ('degree', 'Degree'),
        ('career', 'Career'),
    ]
    text = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:50]

    class Meta:
        ordering = ['category', 'id']

class Answer(models.Model):
    CHOICE_CHOICES = [
        ('strongly_dislike', 'Strongly Dislike'),
        ('dislike', 'Dislike'),
        ('neutral', 'Neutral'),
        ('like', 'Like'),
        ('strongly_like', 'Strongly Like'),
    ]
    
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='answers', on_delete=models.CASCADE)
    choice = models.CharField(max_length=20, choices=CHOICE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.choice}"

    class Meta:
        unique_together = ['question', 'user']  # One answer per user per question
        ordering = ['-created_at']

class Career(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField()
    required_skills = models.JSONField(default=list)  # List of skills
    interest_keywords = models.JSONField(default=list)  # Keywords that match this career
    degree_requirements = models.JSONField(default=list)  # Preferred degrees
    salary_range = models.CharField(max_length=50, blank=True)
    growth_prospects = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('very_high', 'Very High'),
    ])
    work_environment = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class CareerRecommendation(models.Model):
    user = models.ForeignKey(User, related_name='career_recommendations', on_delete=models.CASCADE)
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    match_score = models.FloatField()  # 0-100
    reasoning = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.career.name} ({self.match_score}%)"

    class Meta:
        unique_together = ['user', 'career']
        ordering = ['-match_score']
