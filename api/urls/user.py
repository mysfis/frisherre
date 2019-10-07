from rest_framework import routers
from django.urls import path, include
from api.views.user import UserViewSet, CurrentUserView, AccountViewSet, DetailedAccountViewSet

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'currentuser', CurrentUserView, 'currentuser')
router.register(r'detailedaccount', DetailedAccountViewSet)
router.register(r'account', AccountViewSet, 'account')
urlpatterns = router.urls
