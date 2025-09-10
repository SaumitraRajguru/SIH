from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    age = models.IntegerField(null=True, blank=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
