"""This is a view module for the Outing object

This module does stuff.
"""

from rest_framework import viewsets

from api.models import Community
from api.serializers.base.community import CommunitySerializer

class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer