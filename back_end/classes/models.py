from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Class(models.Model):

    GROUP_CHOICES = [
        ('Sci', 'Science'),
        ('Hum', 'Humanities'),
        ('Bus', 'Business Studies')
    ]

    name = models.CharField(max_length=20)
    group = models.CharField(choices=GROUP_CHOICES, max_length=30, null=True, blank=True)
    class_teacher = models.OneToOneField('teachers.Teacher', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class Subject(models.Model):

    related_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    teacher = models.ForeignKey('teachers.Teacher', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name
    
class Exam(models.Model):

    related_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    exam = models.ForeignKey('exams.Exam', on_delete=models.CASCADE, null=True, blank=False)
    exam_year = models.IntegerField(validators=[MinValueValidator(1900), MaxValueValidator(9999)], null=True, blank=False)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=True)#, limit_choices_to=limit_subject_choices)
    subjective_marks = models.IntegerField()
    objective_marks = models.IntegerField()
    total_marks = models.IntegerField()


class MarksSheet(models.Model):

    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, null=True, blank=True)
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, null=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=False)
    subjective_marks = models.IntegerField()
    objective_marks = models.IntegerField()
    total_marks = models.IntegerField()
    letter_grade = models.CharField(max_length=5)
    


