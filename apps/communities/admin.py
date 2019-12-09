from django.contrib import admin
from apps.communities.models import Community, Membership

admin.site.register(Community)
admin.site.register(Membership)