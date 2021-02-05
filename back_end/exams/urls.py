from django.urls import path
from .views import (
    ExamTypeDetails
)

urlpatterns = [

    path('<str:exam_type_pk>/details/', ExamTypeDetails.as_view(), name="exam-type-details")
]