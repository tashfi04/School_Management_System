from django.urls import path
from .views import (
    ClassList,
    ClassDetails,
    ClassStudentList,

    SubjectList,
    SubjectDetails,

    ClassExamTypeList,
    SubjectExamList
)

urlpatterns = [

    path('list/', ClassList.as_view(), name="class-list"),
    path('<str:class_pk>/details/', ClassDetails.as_view(), name="class-details"),
    path('<str:class_pk>/students/list/', ClassStudentList.as_view(), name="class-students-list"),
    path('<str:class_pk>/exam_types/list/', ClassExamTypeList.as_view(), name="class-exam-type-list"),

    path('<str:class_pk>/subjects/list/', SubjectList.as_view(), name="subject-list"),
    path('subjects/<str:subject_pk>/details/' , SubjectDetails.as_view(), name="subject-details"),
    path('subjects/<str:subject_pk>/exams/list/' , SubjectExamList.as_view(), name="subject-exam-list")
    #path('marksheets/<str:subject_pk>/<str:exam_pk>/', MarkSheetListCreateUpdate.as_view(), name="marksheet-list-create-update")
]