from api.views.community import CommunityViewSet
from rest_framework.routers import DefaultRouter

communityRouter = DefaultRouter()
communityRouter.register(r'community', CommunityViewSet, basename='community')
urlpatterns = communityRouter.urls