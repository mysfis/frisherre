"""This is a view module for the Outing object

This module does stuff.
"""

from rest_framework import viewsets

from apps.communities.models import Community
from apps.communities.serializers import CommunitySerializer
from apps.users.permissions import IsLoggedInUserOrAdmin


class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

# class MemberShipView(viewsets.ViewSet):
#     permission_classes = (IsLoggedInUserOrAdmin,)
#     serializer_class = DetailedUserSerializer

    # def get_queryset(self):
    #     return Community.objects.filter(profile__id=)