from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    # path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
