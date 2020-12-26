from django.urls import path
from .views import (
    ClassList,

    SubjectList
)

urlpatterns = [

    path('list/', ClassList.as_view(), name = "class-list"),

    path('<str:class_pk>/subjects/list/', SubjectList.as_view(), name = "subject-list")
]