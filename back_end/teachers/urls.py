from django.urls import path
from .views import (
    TeacherList,
    TeacherDetails
)

urlpatterns = [
    path('list/', TeacherList.as_view(), name="teacher-list"),
    path('details/', TeacherDetails.as_view(), name="teacher-details")
]
