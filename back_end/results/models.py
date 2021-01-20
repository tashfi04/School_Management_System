from django.db import models
from django.db.models import F

class TabulationSheet(models.Model):

    #marksheet = models.ForeignKey(MarkSheet, on_delete=models.CASCADE, null=True)
    total_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    total_GP = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    CGPA = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    letter_grade = models.CharField(max_length=5, null=True)
    position = models.PositiveIntegerField(null=True)
    


class MarkSheet(models.Model):

    exam = models.ForeignKey('classes.exam', on_delete=models.CASCADE, null=True, blank=True)
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, null=True)
    subject = models.ForeignKey('classes.subject', on_delete=models.CASCADE, null=True, blank=False)
    subjective_marks = models.DecimalField(max_digits=5, decimal_places=2)
    objective_marks = models.DecimalField(max_digits=5, decimal_places=2)
    total_marks = models.DecimalField(max_digits=5, decimal_places=2)
    letter_grade = models.CharField(max_length=5)
    tabulationsheet = models.ForeignKey(TabulationSheet, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.subject)

    def save(self, *args, **kwargs):

        tabulationsheet = TabulationSheet.objects.filter(marksheet__student_id=self.student, marksheet__exam__exam_type_id=self.exam.exam_type_id, marksheet__exam__related_class_id=self.exam.related_class_id).distinct()

        if self._state.adding:

            #tabulationsheet = TabulationSheet.objects.filter(marksheet__student=self.student, marksheet__exam=self.exam).values_list('id', flat=True).distinct()
            
            if(tabulationsheet):
                self.tabulationsheet = tabulationsheet[0]
                tabulationsheet.update(total_marks=F('total_marks') + self.total_marks)
            else:
                self.tabulationsheet = TabulationSheet.objects.create(total_marks=self.total_marks, total_GP=None, CGPA=None, letter_grade=None, position=None)

        else:
            previous_marks = MarkSheet.objects.filter(student=self.student, exam=self.exam).values_list('total_marks', flat=True)
            tabulationsheet.update(total_marks=F('total_marks') - previous_marks[0] + self.total_marks)

        super().save(*args, **kwargs)

        update_position(self.exam.exam_type_id, self.exam.related_class_id)

def update_position(exam_type, related_class):

    tabulation_sheets = TabulationSheet.objects.filter(marksheet__exam__exam_type_id=exam_type, marksheet__exam__related_class_id=related_class).order_by('total_marks').distinct()
    #print(tabulation_sheets)
    for indx, item in enumerate(tabulation_sheets):
        item.position = indx
        item.save()
