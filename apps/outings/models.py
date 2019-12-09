"""MODEL module for  OUTING object

This module does stuff.
"""

from django.db import models
from django.utils import timezone
from apps.profiles.models import Profile
from apps.communities.models import Community

class Outing(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    location = models.CharField(max_length=120)
    community = models.ForeignKey(
            Community,
            related_name='outings',
            on_delete=models.SET_NULL, 
            null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attendees = models.ManyToManyField(
            Profile,
            through='Attendance',
            related_name='attending_outings',)

    def __str__(self):
        return self.title

class Attendance(models.Model):
    INVITED, PRESENT, ABSENT = 1, 2, 3
    STATUS_CHOICES = (
        (INVITED, 'Invité'), 
        (PRESENT, 'Présent'), 
        (ABSENT, 'Absent'))

    PARTICIPANT, ORGANISER, ATTENDANT, VISITOR = 1, 2, 3, 4
    ROLE_CHOICES = (
        (PARTICIPANT, 'Participant'), 
        (ORGANISER, 'Organisateur'), 
        (ATTENDANT, 'Accompagnateur'), 
        (VISITOR, 'Visiteur'))

    outing = models.ForeignKey(Outing, on_delete=models.CASCADE, related_name='attendances')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='attendances')
    accepted_at = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=INVITED)
    role = models.IntegerField(choices=ROLE_CHOICES, default=PARTICIPANT)
    is_driver = models.BooleanField(blank=True, null=True)
    attendance_notes = models.CharField(max_length=255, blank=True)
    
    class Meta:
        unique_together = ('outing', 'profile')

    def __str__(self):
        return "{}[{}]".format(str(self.outing), str(self.profile))