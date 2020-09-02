from django.urls import path
from .views import student_profile

urlpatterns = [
    path('', student_profile),
]

#from rest_framework_jwt.views import obtain_jwt_token
