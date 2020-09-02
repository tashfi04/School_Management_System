from django.urls import path
from .views import teacher_profile

urlpatterns = [
    path('', teacher_profile),
    
]
