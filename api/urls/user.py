from rest_framework import routers
from django.urls import path, include
from api.views.user import UserViewSet, CurrentUserView, UserAccountViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'currentuser', CurrentUserView, 'currentuser')
router.register(r'accounts', UserAccountViewSet)
urlpatterns = router.urls
