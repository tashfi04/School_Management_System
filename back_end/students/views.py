from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
    PermissionDenied,
)
from rest_framework.generics import (
    ListAPIView
)

from .serializers import (
    StudentDetailsSerializer
)

from .models import Student
from rest_framework import permissions

class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'

class StudentDetails(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StudentDetailsSerializer

    def get_queryset(self):
        user_id = self.request.user.id

        return Student.objects.filter(user_id=user_id)
    

from django.http import HttpResponse
from django.views.generic import View

from pdf_print.pdf_printer import render_to_pdf

from students.models import Student

class GeneratePdf(View):
    def get(self, request, *args, **kwargs):

        student_id = kwargs.get('student_pk', None)
        student_data = Student.objects.filter(username=student_id)

        data = {
           'username': 'S1',
           'password': 2323,
           'name' : student_data[0].name,
           'gender': student_data[0].gender,
           'date_of_birth': student_data[0].date_of_birth,
           'place_of_birth': student_data[0].place_of_birth,
           'mother_name': student_data[0].mother_name,
           'father_name': student_data[0].father_name,
           'guardian_name': student_data[0].guardian_name,
           'present_address': student_data[0].present_address,
           'permanent_address': student_data[0].permanent_address,
           'email': student_data[0].email,
           'telephone': student_data[0].telephone,
           'emergency_telephone':  student_data[0].emergency_telephone,
           'religion': student_data[0].religion,
           'nationality': student_data[0].nationality,
           'previous_school': student_data[0].previous_school,
           'current_class': student_data[0].current_class,
           'roll_no': student_data[0].roll_no,
           'photo': student_data[0].photo.url[1:],
           'student_signature': student_data[0].student_signature.url[1:],
           'guardian_signature': student_data[0].guardian_signature.url[1:],
           'headmaster_signature': student_data[0].headmaster_signature.url[1:]
        }
        
        pdf = render_to_pdf('pdf.html', data)
        return HttpResponse(pdf, content_type='application/pdf')
