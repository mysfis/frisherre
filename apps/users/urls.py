"""This is module for providing API URL related to the User object

This module does stuff.
"""
from django.urls import path, include
from rest_framework import routers, views,serializers, status
from rest_framework.response import Response
from apps.users.views import UserViewSet, AccountViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'accounts', AccountViewSet, basename='account')

urlpatterns = router.urls

# class MessageSerializer(serializers.Serializer):
#     message = serializers.CharField()
# class EchoView(views.APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = MessageSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(
#             serializer.data, status=status.HTTP_201_CREATED)

# urlpatterns += path('echo/', EchoView.as_view())