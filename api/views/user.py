from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from api.models import User, UserAccount
from api.serializers.user import UserSerializer, UserAccountSerializer

from api.permissions import IsLoggedInUserOrAdmin, IsAdminUser, IsLoggedInAccountOrAdmin

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class CurrentUserView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(email=self.request.user.email)

class UserAccountViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'retrieve' or self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInAccountOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
