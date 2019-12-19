from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from django.utils import timezone
# from rest_framework.parsers import MultiPartParser, FormParser

from apps.profiles.models import Profile, Register
from apps.profiles.serializers import ProfileSerializer, RegisterSerializer

from apps.users.models import Account

from apps.outings.models import Attendance, Outing
from apps.outings.serializers import AttendanceSerializer , ScheduleSerializer

from apps.users.permissions import IsAdminUser, IsLoggedInProfileOrAdmin

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    @action(detail=True)
    def attendances(self, request, pk):
        #Fetch profiles of the family
        my_profile = self.get_object()
        household_registers = Register.objects.filter(account=request.user.account)
        profile_pk_list = list(map(lambda item: item.profile.pk, household_registers))

        my_attendances = Attendance.objects.filter(profile__in=profile_pk_list, outing__date__gte=timezone.now()-timezone.timedelta(days=1)).select_related('outing', 'profile') #profile=my_profile
        
        my_outing_pk_list = list(map(lambda item: item.outing.pk, my_attendances))
        all_attendances = Outing.objects.filter(pk__in=my_outing_pk_list)

        # serializer = AttendanceSerializer(all_attendances, many=True, context={ 'request': request })
        serializer = ScheduleSerializer(all_attendances, many=True, context={ 'request': request })

        return Response(serializer.data)

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
