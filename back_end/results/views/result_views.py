from ..models import MarkSheet, TabulationSheet
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    TabulationSheetSerializer,
    ClassTestDetailsSerializer,
    TermTestDetailsSerializer,
    LabDetailsSerializer,
    CombinedTestDetailsSerializer
)

class TabulationSheetList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = TabulationSheetSerializer

    def get_queryset(self):

        session_id = self.kwargs.get('session_pk', None)
        class_id = self.kwargs.get('class_pk', None)
        exam_type_id = self.kwargs.get('exam_type_pk', None)

        queryset = TabulationSheet.objects.filter(marksheet__session_id=session_id, marksheet__exam__exam_type_id=exam_type_id, marksheet__exam__related_class_id=class_id).distinct()

        if queryset:
            return queryset
        else:
            raise NotFound("No tabulation sheet has created yet!")

class ResultCardDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = TabulationSheetSerializer

    def get_queryset(self):

        
        class_id = self.kwargs.get('class_pk', None)
        student_id = self.kwargs.get('student_pk', None)

        queryset = TabulationSheet.objects.filter(marksheet__exam__related_class_id=class_id, marksheet__student_id=student_id)

        if queryset:
            return queryset
        else:
            raise NotFound("No result card available!")

class ClassTestDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = ClassTestDetailsSerializer

    def get_queryset(self):

        session_id = self.kwargs.get('session_pk', None)
        subject_id = self.kwargs.get('subject_pk', None)
        exam_type_id = self.kwargs.get('exam_type_pk', None)

        queryset = MarkSheet.objects.filter(session_id=session_id, exam__subject_id=subject_id, exam__exam_type_id=exam_type_id).exclude(exam__class_test_marks=0)

        if queryset:
            return queryset
        else:
            raise NotFound("No class test marks available for the selected subject!")

class TermTestDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = TermTestDetailsSerializer

    def get_queryset(self):

        session_id = self.kwargs.get('session_pk', None)
        subject_id = self.kwargs.get('subject_pk', None)
        exam_type_id = self.kwargs.get('exam_type_pk', None)

        queryset = MarkSheet.objects.filter(session_id=session_id, exam__subject_id=subject_id, exam__exam_type_id=exam_type_id).exclude(exam__term_subjective_marks=0)

        if queryset:
            return queryset
        else:
            raise NotFound("No term test marks available for the selected subject!")

class LabDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = LabDetailsSerializer

    def get_queryset(self):

        session_id = self.kwargs.get('session_pk', None)
        subject_id = self.kwargs.get('subject_pk', None)
        exam_type_id = self.kwargs.get('exam_type_pk', None)

        queryset = MarkSheet.objects.filter(session_id=session_id, exam__subject_id=subject_id, exam__exam_type_id=exam_type_id).exclude(exam__lab_marks=0)

        if queryset:
            return queryset
        else:
            raise NotFound("No lab exam marks available for the selected subject!")

class CombinedTestDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = CombinedTestDetailsSerializer

    def get_queryset(self):

        session_id = self.kwargs.get('session_pk', None)
        subject_id = self.kwargs.get('subject_pk', None)
        exam_type_id = self.kwargs.get('exam_type_pk', None)

        queryset = MarkSheet.objects.filter(session_id=session_id, exam__subject_id=subject_id, exam__exam_type_id=exam_type_id)

        if queryset:
            return queryset
        else:
            raise NotFound("No exam marks available for the selected subject!")
