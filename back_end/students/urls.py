from django.urls import path
from .views import StudentDetails

urlpatterns = [
    path('details/', StudentDetails.as_view(), name = 'student-details'),
]

#from rest_framework_jwt.views import obtain_jwt_token
