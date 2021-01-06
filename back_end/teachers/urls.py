from django.urls import path
from .views import (
    TeacherList,
    TeacherDetails,
    TeacherSubjectList
)

urlpatterns = [
    path('list/', TeacherList.as_view(), name="teacher-list"),
    path('details/', TeacherDetails.as_view(), name="teacher-details"),
    path('<str:teacher_pk>/subjects/list/', TeacherSubjectList.as_view(), name = "teacher-subject-list"),
]
