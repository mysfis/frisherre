from rest_framework import permissions
from apps.communities.models import Membership

class IsCommunityAdminOrAdmin(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff: return True
        user_profiles = request.user.account.profiles.all()
        memberships = Membership.objects.filter(community=obj, status=Membership.ADMIN)
        for membership in memberships: return membership.profile in user_profiles
        return False
