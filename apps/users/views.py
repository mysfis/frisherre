from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.users.models import User, Account
from apps.users.serializers import AccountSerializer, UserSerializer, DetailedUserSerializer
from apps.users.permissions import IsLoggedInUserOrAdmin, IsAdminUser, IsLoggedInAccountOrAdmin

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = DetailedUserSerializer

    @action(detail=False)
    def me(self, request):
        user = get_object_or_404(User.objects.all(), email=request.user)
        serializer = DetailedUserSerializer(user, context={ 'request': request })
        return Response(serializer.data)

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action in ['retrieve', 'update', 'partial_update', 'mine']:
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            permission_classes = [IsLoggedInAccountOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]