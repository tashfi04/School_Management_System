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

from .serializers import (
    TeacherListSerializer,
    TeacherDetailsSerializer
)
from .models import Teacher
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

