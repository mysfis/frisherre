from rest_framework import routers
from apps.profiles.views import ProfileViewSet, RegisterViewSet

router = routers.DefaultRouter()
router.register(r'profiles', ProfileViewSet, 'profile')
router.register(r'registers', RegisterViewSet, 'register')

urlpatterns = router.urls


