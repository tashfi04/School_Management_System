from ..models import Class
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
    PermissionDenied,
)
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)

from ..serializers import (
    ClassStudentsListSerializer,
)
from students.models import Student

class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'

class ClassStudentList(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ClassStudentsListSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)
        queryset = Student.objects.filter(current_class_id = class_id)

        if queryset:
            return queryset
        else:
            raise NotFound("No students has been added to the class yet!")