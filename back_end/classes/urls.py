from django.urls import path
from .views import (
    ClassList,
    ClassDetails,
    SubjectList,
    ClassStudentList,
    SubjectDetails
)

urlpatterns = [

    path('list/', ClassList.as_view(), name = "class-list"),
    path('<str:class_pk>/details/', ClassDetails.as_view(), name = "class-details"),

    path('<str:class_pk>/subjects/list/', SubjectList.as_view(), name = "subject-list"),
    path('<str:class_pk>/students/list/', ClassStudentList.as_view(), name = "class-students-list"),
    path('subjects/<str:subject_pk>/details/' , SubjectDetails.as_view(), name = "subject-details"),
]