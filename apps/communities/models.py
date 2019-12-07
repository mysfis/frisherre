"""MODEL module for  COMMUNITY object

This module does stuff.
"""

from django.db import models
from django.utils import timezone
from apps.profiles.models import Profile

class Community(models.Model):
    LOCAL, PRACTICE, INTEREST, ACTION, CIRCUMSTANCES = 1, 2, 3, 4, 5
    TYPOLOGY_CHOICES = (
        (LOCAL, "locale"), 
        (PRACTICE, "de pratique"), 
        (INTEREST, "d'intérêt"), 
        (ACTION, "d'action"), 
        (CIRCUMSTANCES, "de circomstances"))

    name = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    description = models.TextField()

    typology = models.IntegerField(choices=TYPOLOGY_CHOICES, default=PRACTICE)
    icon_category = models.CharField(max_length=120)
    icon_name = models.CharField(max_length=120)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Profile, related_name='created_communities', on_delete=models.CASCADE)

    members = models.ManyToManyField(Profile, related_name='communities',
            through='Membership', through_fields=('community', 'profile'))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "communities"

class Membership(models.Model):
    LEFT, INVITED, JOINED, ADMIN = 0, 1, 2, 3
    STATUS_CHOICES = ((INVITED, 'Invité'), (JOINED, 'Membre'), (LEFT, 'Ancien'), (ADMIN, 'Administrateur'))

    community = models.ForeignKey(Community, related_name='memberships',
            on_delete=models.SET_NULL, null=True)
    profile = models.ForeignKey(Profile, related_name='memberships',
            on_delete=models.SET_NULL, null=True)

    accepted_at = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=INVITED)

    
    class Meta:
        unique_together = ('community', 'profile')

    def __str__(self):
        return "{}[{}]".format(str(self.community), str(self.profile))