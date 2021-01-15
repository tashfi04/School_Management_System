from exams.models import ExamType
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    ClassExamTypeListSerializer
)

class ClassExamTypeList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = ClassExamTypeListSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)

        queryset = ExamType.objects.filter(exam__related_class_id=class_id).distinct()

        if queryset:
            return queryset
        else:
            raise NotFound("No exam has been added to this class yet!")