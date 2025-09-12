# quiz/admin.py
from django.contrib import admin
from .models import Question, Answer, Field # <-- Import the new Field model

@admin.register(Field) # <-- Register the new Field model
class FieldAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'text_short', 'field', 'created_at'] # <-- Use 'field' instead of 'category'
    list_filter = ['field'] # <-- Use 'field' instead of 'category'
    search_fields = ['text']
    ordering = ['field', 'id'] # <-- Use 'field' instead of 'category'
    
    def text_short(self, obj):
        return obj.text[:100] + "..." if len(obj.text) > 100 else obj.text
    text_short.short_description = 'Question Text'

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'question_short', 'choice', 'created_at']
    list_filter = ['choice', 'question__field'] # <-- Use 'question__field'
    search_fields = ['user__username', 'question__text']
    ordering = ['-created_at']
    
    def question_short(self, obj):
        return obj.question.text[:50] + "..." if len(obj.question.text) > 50 else obj.question.text
    question_short.short_description = 'Question'