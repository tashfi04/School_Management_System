from django.urls import path
from .views import (
    ClassList,
    ClassDetails,

    SubjectList,

    MarkSheetListCreateUpdate
)

urlpatterns = [

    path('list/', ClassList.as_view(), name = "class-list"),
    path('<str:class_pk>/details/', ClassDetails.as_view(), name = "class-details"),

    path('<str:class_pk>/subjects/list/', SubjectList.as_view(), name = "subject-list"),

    path('marksheets/<str:subject_pk>/<str:exam_pk>/', MarkSheetListCreateUpdate.as_view(), name = "marksheet-list-create-update")
]