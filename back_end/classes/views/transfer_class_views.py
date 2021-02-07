from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from students.models import Student
from ..models import Class, Subject, Exam
from results.models import MarkSheet, TabulationSheet
from exams.models import ExamType

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import NextClassListSerializer

class NextClassList(ListAPIView):

    permission_classes = [AllowAny]
    serializer_class = NextClassListSerializer

    def get_queryset(self):

        current_class_id = self.kwargs.get('class_pk', None)

        current_class = Class.objects.filter(id=current_class_id)

        if current_class:
            return Class.objects.filter(class_order=current_class[0].class_order + 1)
        else:
            raise NotFound("There is no next class")


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def transfer_class_with_selection(request, class_pk):

    class_selection_list = request.data

    total_exams = Exam.objects.filter(related_class_id=class_pk).count()
    total_marksheets = MarkSheet.objects.filter(exam__related_class_id=class_pk).count()

    student_list_count = Student.objects.filter(current_class=class_pk).count()

    if total_marksheets != (total_exams * student_list_count):
        return Response("All exam results has not been submitted yet!")

    final_exam = ExamType.objects.filter(exam__related_class_id=class_pk).distinct().order_by('-exam_order').first()

    current_class = Class.objects.get(id=class_pk)
    #next_class = Class.objects.get(class_order=current_class.class_order + 1)
    
    if current_class.class_order == 1:
        previous_class = 0
    else:
        previous_class = Class.objects.get(id=current_class.class_order - 1)
        previous_class_final_exam = ExamType.objects.filter(exam__related_class_id=previous_class.id).distinct().order_by('-exam_order').first()
        previous_class_passed_student_count = TabulationSheet.objects.filter(marksheet__exam__exam_type_id=previous_class_final_exam.id).exclude(letter_grade='F').count()
        

    for item in class_selection_list:

        current_tabulation_sheet = TabulationSheet.objects.filter(marksheet__exam__exam_type_id=final_exam.id, marksheet__student_id=item['student_id']).distinct()
        student = Student.objects.get(pk=item['student_id'])
        
        if current_tabulation_sheet[0].letter_grade != 'F':

            student.current_class = item['next_class']
            student.roll_no = current_tabulation_sheet[0].position

        else:
            previous_class_passed_student_count += 1
            student.roll_no = previous_class_passed_student_count
            
        student.save()

    return Response("Student's class and roll no has been updated according to selection")

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def transfer_class(request, class_pk):

    total_exams = Exam.objects.filter(related_class_id=class_pk).count()
    total_marksheets = MarkSheet.objects.filter(exam__related_class_id=class_pk).count()

    student_list = Student.objects.filter(current_class=class_pk)

    if total_marksheets != (total_exams * len(student_list)):
        return Response("All exam results has not been submitted yet!")

    final_exam = ExamType.objects.filter(exam__related_class_id=class_pk).distinct().order_by('-exam_order').first()
    #final_exam_tabulation_list = TabulationSheet.objects.filter(marksheet__exam__exam_type_id=final_exam.id).sort_by

    current_class = Class.objects.get(id=class_pk)
    next_class = Class.objects.get(class_order=current_class.class_order + 1)
    #print(next_class)
    #print(current_class.class_order)
    if current_class.class_order == 1:
        previous_class = 0
    else:
        previous_class = Class.objects.get(id=current_class.class_order - 1)
        previous_class_final_exam = ExamType.objects.filter(exam__related_class_id=previous_class.id).distinct().order_by('-exam_order').first()
        previous_class_passed_student_count = TabulationSheet.objects.filter(marksheet__exam__exam_type_id=previous_class_final_exam.id).exclude(letter_grade='F').count()
        

    for student in student_list:

        current_tabulation_sheet = TabulationSheet.objects.filter(marksheet__exam__exam_type_id=final_exam.id, marksheet__student_id=student.username).distinct()
        
        if current_tabulation_sheet[0].letter_grade != 'F':

            student.current_class = next_class
            student.roll_no = current_tabulation_sheet[0].position

        else:
            previous_class_passed_student_count += 1
            student.roll_no = previous_class_passed_student_count
            
        student.save()

    return Response("Student's class and roll no has been updated")