from ..models import Subject, Exam
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    SubjectListSerializer,
    SubjectExamListSerializer
)

class SubjectList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = SubjectListSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)

        queryset = Subject.objects.filter(related_class_id=class_id, status=0)

        if queryset:
            return queryset
        else:
            raise NotFound("No subject has been added to the class yet!")

class SubjectDetails(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SubjectListSerializer

    def get_queryset(self):
        
        subject_id = self.kwargs.get('subject_pk', None)

        queryset = Subject.objects.filter(pk=subject_id)

        if queryset:
            return queryset
        else:
            raise NotFound("No subject by this primary key")

class SubjectExamList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = SubjectExamListSerializer

    def get_queryset(self):

        subject_pk = self.kwargs.get('subject_pk', None)

        queryset = Exam.objects.filter(subject_id=subject_pk).distinct()

        if queryset:
            return queryset
        else:
            raise NotFound("No exam has been added to this class yet!")
