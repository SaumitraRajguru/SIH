from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

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
