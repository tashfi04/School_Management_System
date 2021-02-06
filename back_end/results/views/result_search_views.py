from academic_sessions.models import Session
from classes.models import Class, Subject
from exams.models import ExamType
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    SessionListSerializer,
    SessionBasedClassListSerializer,
    SessionClassBasedSubjectListSerializer,
    SessionClassBasedExamTypeListSerializer
)

class SessionList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = SessionListSerializer

    queryset = Session.objects.all()

class SessionBasedClassList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = SessionBasedClassListSerializer

    def get_queryset(self):

        session_id = self.kwargs.get('session_pk', None)

        return Class.objects.filter(exam__marksheet__session_id=session_id).distinct()

class SessionClassBasedSubjectList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = SessionClassBasedSubjectListSerializer

    def get_queryset(self):

        session_id = self.kwargs.get('session_pk', None)
        class_id = self.kwargs.get('class_pk', None)

        return Subject.objects.filter(exam__marksheet__session_id=session_id, related_class_id=class_id).distinct()

class SessionClassBasedExamTypeList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = SessionClassBasedExamTypeListSerializer

    def get_queryset(self):

        session_id = self.kwargs.get('session_pk', None)
        class_id = self.kwargs.get('class_pk', None)

        return ExamType.objects.filter(exam__marksheet__session_id=session_id, exam__related_class_id=class_id).distinct()
