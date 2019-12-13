from apps.communities.views import CommunityViewSet, MembershipView
from rest_framework.routers import DefaultRouter

communityRouter = DefaultRouter()
communityRouter.register(r'communities', CommunityViewSet, basename='community')
communityRouter.register(r'memberships', MembershipView, basename='membership')
urlpatterns = communityRouter.urls