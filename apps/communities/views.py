"""This is a view module for the Outing object

This module does stuff.
"""

from rest_framework import viewsets

from apps.communities.models import Community, Membership
from apps.communities.serializers import CommunitySerializer, MembershipSerializer
from apps.users.permissions import IsLoggedInUserOrAdmin
from rest_framework.permissions import AllowAny
from apps.users.permissions import IsAdminUser
from apps.communities.permissions import IsCommunityAdminOrAdmin


class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.with_total_numbers()
    serializer_class = CommunitySerializer

    def get_permissions(self):
        permission_classes = []
        if self.action in ['retrieve', 'list', 'create']:
            permission_classes = [AllowAny]
        elif self.action in [ 'update', 'partial_update']:
            permission_classes = [IsCommunityAdminOrAdmin]
        elif self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class MembershipView(viewsets.ModelViewSet):
    queryset = Membership.objects.all().select_related('community', 'profile')
    serializer_class = MembershipSerializer
    permission_classes = (IsLoggedInUserOrAdmin,)