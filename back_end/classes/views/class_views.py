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
    ClassListSerializer,
    SubjectListSerializer
)

class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'

class ClassList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = ClassListSerializer

    def get_queryset(self):

        queryset = Class.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound("No Class Available")
    