from .models import ExamType
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from .serailizers import (
    ExamTypeDetailsSerializers
)

class ExamTypeDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = ExamTypeDetailsSerializers

    def get_queryset(self):

        exam_type_id = self.kwargs.get('exam_type_pk', None)

        queryset = ExamType.objects.filter(id=exam_type_id)

        if queryset:
            return queryset
        else:
            raise NotFound("The exam you are looking for does not exist!")
