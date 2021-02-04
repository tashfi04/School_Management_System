from django.urls import path
from .views import (
    MarkSheetListCreateUpdate,
    TabulationSheetList,
    ResultCardDetails,
    ClassTestDetails,
    TermTestDetails,
    LabDetails,
    CombinedTestDetails
)

urlpatterns = [

    path('marksheet/<str:exam_pk>/', MarkSheetListCreateUpdate.as_view(), name="marksheet-list-create-update"),
    path('tabulationsheet/<str:session_pk>/<str:class_pk>/<str:exam_type_pk>/list/', TabulationSheetList.as_view(), name="tabulation-sheet-list"),
    path('result_card/<str:class_pk>/<str:student_pk>/details/', ResultCardDetails.as_view(), name="result-card-details"),
    path('marksheet/class_test/<str:session_pk>/<str:subject_pk>/<str:exam_type_pk>/details/', ClassTestDetails.as_view(), name="class-test-details"),
    path('marksheet/term_test/<str:session_pk>/<str:subject_pk>/<str:exam_type_pk>/details/', TermTestDetails.as_view(), name="ter,-test-details"),
    path('marksheet/lab/<str:session_pk>/<str:subject_pk>/<str:exam_type_pk>/details/', LabDetails.as_view(), name="lab-details"),
    path('marksheet/combined_test/<str:session_pk>/<str:subject_pk>/<str:exam_type_pk>/details/', CombinedTestDetails.as_view(), name="combined-test-details")
]