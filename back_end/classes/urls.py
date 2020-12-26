from django.urls import path
from .views import (
    ClassesList
)

urlpatterns = [
    path('list/', ClassesList.as_view(), name = "classes-list")
]