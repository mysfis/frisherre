"""MODEL module for  COMMUNITY object

This module does stuff.
"""

from django.db import models
from django.db.models import Count, Q
from django.utils import timezone
from apps.profiles.models import Profile
from apps.models import SoftDeletionManager, SoftDeletionModel

# class CommunityQuerySet(models.QuerySet):
#     def with_total_numbers(self):
#         return self.annotate(
#             ann_total_members=Count('memberships', filter=Q(memberships__status__in=(0,1)))
#         )
class AnnotatedManager(SoftDeletionManager):
    def get_queryset(self):
        return super().get_queryset().annotate(ann_total_members=Count('memberships', filter=Q(memberships__status__in=(0,1))))

class Community(SoftDeletionModel):
    ACTIVE, INACTIVE, DELETED = 1, 2, 3
    STATUS_CHOICES = (
        (ACTIVE, "active"), 
        (INACTIVE, "inactive"), 
        (DELETED, "supprimée"))

    LOCAL, PRACTICE, INTEREST, ACTION, CIRCUMSTANCES = 1, 2, 3, 4, 5
    TYPOLOGY_CHOICES = (
        (LOCAL, "de voisinage"), 
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
    deleted = models.BooleanField(blank=True, null=True)

    members = models.ManyToManyField(Profile, related_name='communities',
            through='Membership', through_fields=('community', 'profile'))
    
    # objects = CommunityQuerySet.as_manager()
    objects = AnnotatedManager()

    @property
    def total_members(self):
        return self.ann_total_members

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "communities"

class Membership(SoftDeletionModel):
    MEMBER, ADMIN, INVITED, LEFT = 0, 1, 2, 3
    STATUS_CHOICES = ((MEMBER, 'Membre'), (ADMIN, 'Administrateur'), (INVITED, 'Invité'), (LEFT, 'Ancien'))

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