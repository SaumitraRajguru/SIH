from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import College
from .serializers import CollegeSerializer

class CollegePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class CollegeListView(generics.ListAPIView):
    """
    API endpoint to fetch colleges based on a course/career slug.
    """
    serializer_class = CollegeSerializer
    pagination_class = CollegePagination

    def get_queryset(self):
        queryset = College.objects.all()
        course_slug = self.request.query_params.get('course')
        
        if course_slug:
            # Query for colleges where the course slug is in the courses_offered list
            queryset = queryset.filter(courses_offered__contains=[course_slug])
            
        return queryset