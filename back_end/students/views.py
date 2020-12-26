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

