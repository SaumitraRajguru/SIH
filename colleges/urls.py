from django.urls import path
from .views import CollegeListView

urlpatterns = [
    path('colleges/', CollegeListView.as_view(), name='college-list'),
]