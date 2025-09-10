from django.contrib import admin
from .models import Question, Answer

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'text_short', 'category', 'created_at']
    list_filter = ['category']
    search_fields = ['text']
    ordering = ['category', 'id']
    
    def text_short(self, obj):
        return obj.text[:100] + "..." if len(obj.text) > 100 else obj.text
    text_short.short_description = 'Question Text'

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'question_short', 'choice', 'created_at']
    list_filter = ['choice', 'question__category']
    search_fields = ['user__username', 'question__text']
    ordering = ['-created_at']
    
    def question_short(self, obj):
        return obj.question.text[:50] + "..." if len(obj.question.text) > 50 else obj.question.text
    question_short.short_description = 'Question'
