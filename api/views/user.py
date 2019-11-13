from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from api.models import User, Account
from api.serializers.nested.user import DetailedUserSerializer, DetailedAccountSerializer
from api.serializers.base.user import AccountSerializer as baseAccountSerializer, MyUserInfoSerializer

from api.permissions import IsLoggedInUserOrAdmin, IsAdminUser, IsLoggedInAccountOrAdmin

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = DetailedUserSerializer

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
    permission_classes = (IsLoggedInUserOrAdmin,)
    serializer_class = DetailedUserSerializer

    def get_queryset(self):
        return User.objects.filter(email=self.request.user.email)

class MyUserInfoView(viewsets.ModelViewSet):
    permission_classes = (IsLoggedInUserOrAdmin,)
    serializer_class = MyUserInfoSerializer

    def get_queryset(self):
        return User.objects.filter(email=self.request.user.email)

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = baseAccountSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'retrieve' or self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInAccountOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class DetailedAccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = DetailedAccountSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'retrieve' or self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInAccountOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
