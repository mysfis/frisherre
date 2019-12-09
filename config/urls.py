"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('api/v1/', include('apps.users.urls')),
    path('api/v1/', include('apps.profiles.urls')),
    path('api/v1/', include('apps.communities.urls')),
    path('api/v1/', include('apps.outings.urls')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

# if settings.DEBUG is True:
#     urlpatterns += path(r'^$' , TemplateView.as_view(template_name='index.html')),
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# else:
#     urlpatterns += re_path(r'^.*', TemplateView.as_view(template_name='index.html')),

# urlpatterns += re_path(r'^.*', TemplateView.as_view(template_name='index.html')),