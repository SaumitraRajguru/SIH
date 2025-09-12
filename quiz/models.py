# quiz/models.py
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

# The new Field model
class Field(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    def __str__(self):
        return self.name

class Question(models.Model):
    # The ForeignKey links questions to a specific Field
    text = models.TextField()
    field = models.ForeignKey(Field, on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.text[:50]
    class Meta:
        ordering = ['field', 'id']

class Answer(models.Model):
    CHOICE_CHOICES = [
        ('strongly_dislike', 'Strongly Dislike'),
        ('dislike', 'Dislike'),
        ('neutral', 'Neutral'),
        ('like', 'Like'),
        ('strongly_like', 'Strongly Like'),
        ('love_it', 'Love It'),
        ('hate_it', 'Hate It'),
    ]
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='answers', on_delete=models.CASCADE)
    choice = models.CharField(max_length=20, choices=CHOICE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.username} - {self.choice}"
    class Meta:
        unique_together = ['question', 'user']
        ordering = ['-created_at']