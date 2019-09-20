from rest_framework import viewsets

from api.models import Outing
from api.serializers.outing import OutingSerializer

class OutingViewSet(viewsets.ModelViewSet):
    serializer_class = OutingSerializer
    queryset = Outing.objects.all()

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
