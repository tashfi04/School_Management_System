from django.urls import path
from .views import (
    MarkSheetListCreateUpdate,
    TabulationSheetList
)

urlpatterns = [

    path('marksheet/<str:subject_pk>/<str:exam_pk>/', MarkSheetListCreateUpdate.as_view(), name="marksheet-list-create-update"),
    path('tabulationsheet/<str:class_pk>/<str:exam_type_pk>/list/', TabulationSheetList.as_view(), name="tabulation-sheet-list")
]