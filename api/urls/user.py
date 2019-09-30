from rest_framework import routers
from django.urls import path, include
from api.views.user import UserViewSet, CurrentUserView, AccountViewSet, ProfileViewSet

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'currentuser', CurrentUserView, 'currentuser')
router.register(r'account', AccountViewSet)
router.register(r'profile', ProfileViewSet, 'profile')
urlpatterns = router.urls
