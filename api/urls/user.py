"""This is module for providing API URL related to the User object

This module does stuff.
"""

from rest_framework import routers
from api.views.user import UserViewSet, MyUserInfoView, CurrentUserView, \
    AccountViewSet, DetailedAccountViewSet

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'myuserinfo', MyUserInfoView, 'myuserinfo')
router.register(r'currentuser', CurrentUserView, 'currentuser')
router.register(r'detailedaccount', DetailedAccountViewSet)
router.register(r'account', AccountViewSet, 'account')
urlpatterns = router.urls
