from django.db import models

class College(models.Model):
    """
    Model for a college, populated from a CSV file.
    """
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    # Storing courses as a JSON field for flexibility
    courses_offered = models.JSONField(default=list)
    
    def __str__(self):
        return f"{self.name}, {self.city}"