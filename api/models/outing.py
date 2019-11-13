"""MODEL module for  OUTING object

This module does stuff.
"""

from django.db import models
from django.utils import timezone
from api.models import Profile

class Outing(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    location = models.CharField(max_length=120)
    organizer = models.ForeignKey(
            Profile,
            related_name='organized_outings',
            on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attendees = models.ManyToManyField(
            Profile,
            through='Attendance',
            related_name='attending_outings',)

    def __str__(self):
        return self.title

class Attendance(models.Model):
    outing = models.ForeignKey(
            Outing, 
            on_delete=models.CASCADE,
            related_name='attendances')
    profile = models.ForeignKey(
            Profile, 
            on_delete=models.CASCADE,
            related_name='attendances')
    accepted_at = models.DateTimeField(auto_now_add=True)
    is_participant = models.BooleanField(blank=True, null=True)
    is_driver = models.BooleanField(blank=True, null=True)
    attendance_notes = models.CharField(max_length=255, blank=True)
    
    class Meta:
        unique_together = ('outing', 'profile')

    def __str__(self):
        return "{}[{}]".format(str(self.outing), str(self.profile))