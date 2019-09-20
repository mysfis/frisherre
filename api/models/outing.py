from django.db import models
from django.utils import timezone

class Outing(models.Model):
    title = models.CharField(max_length=120)
    date = models.DateTimeField(default=timezone.now)
    description = models.TextField()

    def __str__(self):
        return self.title
