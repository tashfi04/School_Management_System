from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from students.models import Student
from ..models import Class, Subject, Exam
from results.models import MarkSheet, TabulationSheet
from exams.models import ExamType

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def check_next_class(request, class_pk):
    
    current_class = Class.objects.get(id=class_pk)
    next_class_list = Class.objects.get(class_order=current_class.class_order + 1)

    return Response(next_class_list)


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