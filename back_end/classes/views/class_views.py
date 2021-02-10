from ..models import Class
from exams.models import ExamType
from students.models import Student
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)

from ..serializers import (
    ClassListSerializer,
    ClassDetailsSerializer,
    ClassStudentListSerializer,
    ClassExamTypeListSerializer
)

class ClassList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = ClassListSerializer

    def get_queryset(self):

        queryset = Class.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound("No classes available")

class ClassDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = ClassDetailsSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)

        queryset = Class.objects.filter(id=class_id)

        if queryset:
            return queryset
        else:
            raise NotFound("The class you are looking for does not exist!")
    
class ClassStudentList(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ClassStudentListSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)
        queryset = Student.objects.filter(current_class_id=class_id)

        if queryset:
            return queryset
        else:
            raise NotFound("No student has been added to the class yet!")

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
