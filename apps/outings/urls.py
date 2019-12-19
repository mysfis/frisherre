from apps.outings.views import OutingViewSet, AttendanceViewSet
from rest_framework.routers import DefaultRouter

outingRouter = DefaultRouter()
outingRouter.register(r'outings', OutingViewSet, basename='outing')
outingRouter.register(r'attendances', AttendanceViewSet, basename='attendance')

urlpatterns = outingRouter.urls


# Alternatively you can use Django's include function, like so...
# urlpatterns = [
#     url(r'^forgot-password/$', ForgotPasswordFormView.as_view()),
#     url(r'^', include(router.urls)),
# ]

# from django.urls import path
# from .views import (
#     OutingListView, OutingDetailView,
#     OutingCreateView, OutingUpdateView,  OutingDeleteView)
#
# urlpatterns = [
#     path('', OutingListView.as_view()),
#     path('create/', OutingCreateView.as_view()),
#     path('<pk>', OutingDetailView.as_view()),
#     path('<pk>/update/', OutingUpdateView.as_view()),
#     path('<pk>/delete/', OutingDeleteView.as_view()),
# ]
