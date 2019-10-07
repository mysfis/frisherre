from rest_framework import routers
from api.views.profile import ProfileViewSet, DetailedProfileViewSet

router = routers.DefaultRouter()
router.register(r'detailedprofile', DetailedProfileViewSet, 'profile')
router.register(r'profile', ProfileViewSet, 'profile')
urlpatterns = router.urls


