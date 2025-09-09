from django.contrib import admin
from .models import Career, Question, Choice, QuizAttempt, CareerCart

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 1

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ('question_text', 'academic_level', 'stream')
    search_fields = ('question_text',)

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'timestamp', 'stream')
    list_filter = ('stream', 'academic_level')
    readonly_fields = ('results_data', 'recommendations')

@admin.register(CareerCart)
class CareerCartAdmin(admin.ModelAdmin):
    list_display = ('user',)
    filter_horizontal = ('saved_attempts',)