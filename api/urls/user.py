from rest_framework import routers
from django.urls import path, include
from api.views.user import UserViewSet, CurrentUserView, UserProfileViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'currentuser', CurrentUserView, 'currentuser')
router.register(r'userprofiles', UserProfileViewSet)
urlpatterns = router.urls
