from ..models import Subject
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
    PermissionDenied,
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    SubjectListSerializer
)

class SubjectList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = SubjectListSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)

        queryset = Subject.objects.filter(related_class_id = class_id)

        if queryset:
            return queryset
        else:
            raise NotFound("No subject has been added to the class yet!")