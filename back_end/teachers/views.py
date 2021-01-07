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
    TeacherListSerializer,
    TeacherDetailsSerializer,
    TeacherSubjectListSerializer
)
from .models import Teacher
from classes.models import Subject
from rest_framework import permissions

class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class TeacherList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = TeacherListSerializer

    def get_queryset(self):

        queryset = Teacher.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound("No teacher has beed added yet!")

class TeacherDetails(ListAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TeacherDetailsSerializer
    
    def get_queryset(self):

        user_id = self.request.user.id

        return Teacher.objects.filter(user_id=user_id)

class TeacherSubjectList(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TeacherSubjectListSerializer

    def get_queryset(self):
        teacher_id = self.kwargs.get('teacher_pk', None)
        queryset = Subject.objects.filter(teacher = teacher_id)

        if queryset:
            return queryset
        else:
            raise NotFound("You are not taking any subject yet!")

