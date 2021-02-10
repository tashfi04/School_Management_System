from django.urls import path
from .views import StudentDetails, GeneratePdf

urlpatterns = [
    path('details/', StudentDetails.as_view(), name='student-details'),
    path('<str:student_pk>/pdf/', GeneratePdf.as_view(), name='generate-pdf')
]

#from rest_framework_jwt.views import obtain_jwt_token
