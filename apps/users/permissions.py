from rest_framework import permissions
from apps.profiles.models import Register

class IsLoggedInUserOrAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff

class IsLoggedInAccountOrAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_staff

class IsLoggedInProfileOrAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        allow = False
        account_registers = Register.objects.filter(account=request.user.account)
        for register in Register.objects.filter(profile=obj):
            if register in account_registers: 
                allow = True
        return allow or request.user.is_staff

class IsAdminUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_staff
