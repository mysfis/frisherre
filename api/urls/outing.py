from api.views.outing import OutingViewSet, DetailedOutingViewSet, AttendanceViewSet
from rest_framework.routers import DefaultRouter

outingRouter = DefaultRouter()
outingRouter.register(r'detailedouting', DetailedOutingViewSet, basename='outing')
outingRouter.register(r'attendance', AttendanceViewSet, basename='attendance')
outingRouter.register(r'outing', OutingViewSet, basename='outing')
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
