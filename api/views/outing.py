from rest_framework import viewsets

from api.models import Outing, Attendance
from api.serializers.base.outing import OutingSerializer
from api.serializers.nested.outing import DetailedOutingSerializer, AttendanceSerializer

class OutingViewSet(viewsets.ModelViewSet):
    queryset = Outing.objects.all()
    serializer_class = OutingSerializer

class DetailedOutingViewSet(viewsets.ModelViewSet):
    queryset = Outing.objects.all()
    serializer_class = DetailedOutingSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

# from rest_framework.generics import (
#     ListAPIView, RetrieveAPIView,
#     CreateAPIView, UpdateAPIView, DestroyAPIView)
#
# from outings.models import Outing
# from .serializers import OutingSerializer
#
# class OutingListView(ListAPIView):
#     queryset = Outing.objects.all()
#     serializer_class = OutingSerializer
#
# class OutingDetailView(RetrieveAPIView):
#     queryset = Outing.objects.all()
#     serializer_class = OutingSerializer
#
# class OutingCreateView(CreateAPIView):
#     queryset = Outing.objects.all()
#     serializer_class = OutingSerializer
#
# class OutingUpdateView(UpdateAPIView):
#     queryset = Outing.objects.all()
#     serializer_class = OutingSerializer
#
# class OutingDeleteView(DestroyAPIView):
#     queryset = Outing.objects.all()
#     serializer_class = OutingSerializer
