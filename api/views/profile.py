from rest_framework import viewsets
from rest_framework.permissions import AllowAny
# from rest_framework.parsers import MultiPartParser, FormParser

from api.models import Profile
from api.serializers.base.profile import ProfileSerializer
from api.serializers.nested.profile import DetailedProfileSerializer

from api.permissions import IsAdminUser, IsLoggedInProfileOrAdmin

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    # parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user_account = self.request.user.user_account
        return Profile.objects.filter(account=user_account)

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [AllowAny]
        elif  self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInProfileOrAdmin]
        elif self.action == 'destroy':
            permission_classes = [IsLoggedInProfileOrAdmin]
        return [permission() for permission in permission_classes]


class DetailedProfileViewSet(viewsets.ModelViewSet):
    serializer_class = DetailedProfileSerializer
    # parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user_account = self.request.user.user_account
        return Profile.objects.filter(account=user_account)

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [AllowAny]
        elif  self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInProfileOrAdmin]
        elif self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
