from django.urls import path, include
from rest_framework import views, serializers, status
from rest_framework.response import Response

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()
class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED)

urlpatterns = [
    path('echo/', EchoView.as_view()),
    path('', include('api.urls.auth')),
    path('', include('api.urls.user')),
    path('', include('api.urls.profile')),
    path('', include('api.urls.outing')),
]
