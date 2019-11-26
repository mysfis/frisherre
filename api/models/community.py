"""MODEL module for  COMMUNITY object

This module does stuff.
"""

from django.db import models
from django.utils import timezone
from api.models import Profile

class Community(models.Model):
    name = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    description = models.TextField()
    category = models.CharField(max_length=120)
    icon = models.CharField(max_length=120)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Profile, related_name='created_communities', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "communities"