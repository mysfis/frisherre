from django.contrib import admin
from apps.communities.models import Community, Membership
from apps.models import SoftDeleteAdmin

admin.site.register(Community, SoftDeleteAdmin)
admin.site.register(Membership)