from django.db import models
from institution.models import Institution
from django.db.models import F
from decimal import Decimal

class TabulationSheet(models.Model):
    total_marks = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    total_GP = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    GPA = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    previous_CGPA = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    current_CGPA = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    letter_grade = models.CharField(max_length=5, null=True, blank=True)
    position = models.PositiveIntegerField(null=True, blank=True)
    #result_published = models.BooleanField(default=False, blank=True)

    def save(self, *args, **kwargs):
        if not self._state.adding:
            if self.marksheet_set.filter(letter_grade='F'):
                self.GPA = 0.00
            else:
                self.GPA = self.total_GP / self.marksheet_set.exclude(exam__subject__subject_type=1).count()
                if self.GPA > 5.00:
                    self.GPA = 5.00

        if self.previous_CGPA:
            if self.previous_CGPA == 0.00:
                self.current_CGPA = 0.00
            else:
                self.current_CGPA = (self.previous_CGPA + Decimal(self.GPA)) / 2
        else:
            self.current_CGPA = self.GPA

        self.letter_grade = calculate_letter_grade(self.current_CGPA)

        super().save(*args, **kwargs)



def get_current_session():

    institution = Institution.objects.all().first()

    print(institution.current_session)
    return institution.current_session_id

class MarkSheet(models.Model):

    exam = models.ForeignKey('classes.Exam', on_delete=models.CASCADE, null=True, blank=False)
    session = models.ForeignKey('academic_sessions.Session', on_delete=models.CASCADE, default=get_current_session, blank=True)
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, null=True, blank=False)
    roll_no = models.IntegerField(null=True, blank=True)
    #subject = models.ForeignKey('classes.subject', on_delete=models.CASCADE, null=True, blank=False)
    class_test_marks = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=False)
    term_test_subjective_marks = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=False)
    term_test_objective_marks = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=False)
    term_test_total_marks = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=True)
    lab_marks = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=True)
    total_marks = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=True)
    GP = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    letter_grade = models.CharField(max_length=5, null=True, blank=True)
    tabulationsheet = models.ForeignKey(TabulationSheet, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.exam)

    def save(self, *args, **kwargs):

        self.term_test_total_marks = (self.term_test_subjective_marks + self.term_test_objective_marks + self.lab_marks) * self.exam.term_total_conversion / 100
        self.total_marks = self.class_test_marks + self.term_test_total_marks
        self.GP = calculate_GP(self.term_test_subjective_marks, self.term_test_objective_marks, self.lab_marks, self.total_marks, self.exam)
        self.letter_grade = calculate_letter_grade(self.GP)

        GP_to_add = calculate_optional_subject_GP(Decimal(self.GP), self.exam.subject.subject_type)

        tabulationsheet = TabulationSheet.objects.filter(marksheet__student_id=self.student, marksheet__exam__exam_type_id=self.exam.exam_type_id, marksheet__exam__related_class_id=self.exam.related_class_id).distinct()
        previous_CGPA = TabulationSheet.objects.filter(marksheet__exam__exam_type__exam_order=self.exam.exam_type.exam_order - 1).values_list('current_CGPA', flat=True)
        if not previous_CGPA:
            previous_CGPA = [0]

        if self._state.adding:

            self.roll_no = self.student.roll_no
            
            if(tabulationsheet):
                self.tabulationsheet = tabulationsheet[0]
                tabulationsheet.update(total_marks=F('total_marks') + self.total_marks)
                tabulationsheet.update(total_GP=F('total_GP') + GP_to_add)
                tabulationsheet.update(previous_CGPA=previous_CGPA[0])

            else:
                self.tabulationsheet = TabulationSheet.objects.create(total_marks=self.total_marks, total_GP=GP_to_add, GPA=GP_to_add, previous_CGPA=previous_CGPA[0], letter_grade=None, position=None)

        else:
            previous_marksheet = MarkSheet.objects.get(id=self.id)
            GP_to_substract = calculate_optional_subject_GP(previous_marksheet.GP, previous_marksheet.exam.subject.subject_type)
            print(">>>>>>>>>>>>>>________________________<<<<<<<<<<<<<<<<<<")
            print(GP_to_add, GP_to_substract)
            tabulationsheet.update(total_marks=F('total_marks') - previous_marksheet.total_marks + self.total_marks)
            tabulationsheet.update(total_GP=F('total_GP') - GP_to_substract + GP_to_add)
            tabulationsheet.update(previous_CGPA=previous_CGPA[0])
            
        super().save(*args, **kwargs)

        update_position(self.exam.exam_type_id, self.exam.related_class_id)

def calculate_GP(term_test_subjective_marks, term_test_objective_marks, lab_marks, total_marks, exam):

    if (term_test_subjective_marks < exam.term_subjective_pass_marks) or (term_test_objective_marks < exam.term_objective_pass_marks)or (lab_marks < exam.lab_pass_marks):
        grade = 0.00
    elif total_marks >= 80:
        grade = 5.00
    elif total_marks >= 70:
        grade = 4.00
    elif total_marks >= 60:
        grade = 3.50
    elif total_marks >= 50:
        grade = 3.00
    elif total_marks >= 40:
        grade = 2.00
    elif total_marks >= 33:
        grade = 1.00
    else:
        grade = 0.00
        
    return grade

def calculate_optional_subject_GP(GP, subject_type):

    if subject_type == 1:
        GP -= Decimal('2.00')

        if GP < 0:
            GP = 0.00

    return GP
    

def calculate_letter_grade(GP):

    if GP >= 5.00:
        letter_grade = 'A+'
    elif GP >= 4.00:
        letter_grade = 'A'
    elif GP >= 3.50:
        letter_grade = 'A-'
    elif GP >= 3.00:
        letter_grade = 'B'
    elif GP >= 2.00:
        letter_grade = 'C'
    elif GP >= 1.00:
        letter_grade = 'D'
    else:
        letter_grade = 'F'
        
    return letter_grade

def update_position(exam_type, related_class):

    tabulation_sheets = TabulationSheet.objects.filter(marksheet__exam__exam_type_id=exam_type, marksheet__exam__related_class_id=related_class).order_by('letter_grade','-total_marks').distinct()

    for indx, item in enumerate(tabulation_sheets):
        item.position = indx + 1
        item.save()
