from apps.communities.views import CommunityViewSet
from rest_framework.routers import DefaultRouter

communityRouter = DefaultRouter()
communityRouter.register(r'communities', CommunityViewSet, basename='community')
urlpatterns = communityRouter.urls