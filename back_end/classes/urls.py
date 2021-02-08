from django.urls import path
from .views import (
    ClassList,
    ClassDetails,
    ClassStudentList,

    SubjectList,
    SubjectDetails,

    ClassExamTypeList,
    SubjectExamList,

    transfer_class,
    transfer_class_with_selection,
    NextClassList,

    RoutineDetails
)

urlpatterns = [

    path('list/', ClassList.as_view(), name="class-list"),
    path('<str:class_pk>/details/', ClassDetails.as_view(), name="class-details"),
    path('<str:class_pk>/students/list/', ClassStudentList.as_view(), name="class-students-list"),
    path('<str:class_pk>/exam_types/list/', ClassExamTypeList.as_view(), name="class-exam-type-list"),

    path('<str:class_pk>/subjects/list/', SubjectList.as_view(), name="subject-list"),
    path('subjects/<str:subject_pk>/details/', SubjectDetails.as_view(), name="subject-details"),
    path('subjects/<str:subject_pk>/exams/list/', SubjectExamList.as_view(), name="subject-exam-list"),
    #path('marksheets/<str:subject_pk>/<str:exam_pk>/', MarkSheetListCreateUpdate.as_view(), name="marksheet-list-create-update")

    path('next_class_list/<str:class_pk>/', NextClassList.as_view(), name="next-class-list"),
    path('transfer_class/<str:class_pk>/', transfer_class, name="transfer-class"),
    path('transfer_class_with_selection/<str:class_pk>/', transfer_class_with_selection, name="transfer-class-with-selection"),

    path('routines/<str:class_pk>/details/', RoutineDetails.as_view(), name="routine-details")
]