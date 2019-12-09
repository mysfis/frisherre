from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
# from rest_framework.parsers import MultiPartParser, FormParser

from apps.profiles.models import Profile, Register
from apps.profiles.serializers import ProfileSerializer, RegisterSerializer

from apps.users.permissions import IsAdminUser, IsLoggedInProfileOrAdmin

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [AllowAny]
        elif  self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInProfileOrAdmin]
        elif self.action == 'destroy':
            permission_classes = [IsLoggedInProfileOrAdmin]
        return [permission() for permission in permission_classes]



class RegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = Register.objects.all()
    
    @action(detail=False)
    def me(self, request):
        registers = Register.objects.filter(account=request.user.account)
        serializer = RegisterSerializer(registers, many=True, context={ 'request': request })
        return Response(serializer.data)

    # def get_queryset(self):
    #     user_account = self.request.user.user_account
    #     return Profile.objects.filter(account=user_account)

    def get_permissions(self):
        permission_classes = []
        if self.action in ['list', 'retrieve', 'create']:
            permission_classes = [AllowAny]
        elif self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInProfileOrAdmin]
        elif self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
