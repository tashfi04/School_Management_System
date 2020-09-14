from django.db import models
from teachers.models import Teacher
from students.models import Student
from classes.models import Class
from django.core.validators import MaxValueValidator, MinValueValidator

class Subject(models.Model):

    TEACHER_CHOICES = Teacher.objects.values_list('username', 'name')
    CLASS_CHOICES = Class.objects.values_list('id', 'name')

    related_class = models.ForeignKey(Class, on_delete=models.CASCADE, null=True, blank=False)
    class_name = models.IntegerField(choices=CLASS_CHOICES, null=True, blank=False)
    name = models.CharField(max_length=50)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True, blank=False) 
    teacher_name = models.CharField(max_length=30, choices=TEACHER_CHOICES, null=True, blank=True)

    def save(self, *args, **kwargs):

        self.related_class = Class.objects.get(pk=self.class_name)
        self.teacher = Teacher.objects.get(pk=self.teacher_name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class Exam(models.Model):

    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    exam_name = models.CharField(max_length=50)
    exam_year = models.IntegerField(validators=[MinValueValidator(1900), MaxValueValidator(9999)], null=True, blank=False)
    #subject = models.ForeignKey(Subject, on_delete=models.CASCADE, choices=SUBJECT_CHOICES, null=True, blank=True)
    subjective_marks = models.IntegerField()
    objective_marks = models.IntegerField()
    total_marks = models.IntegerField()

class MarksSheet(models.Model):

    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, null=True, blank=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    #subject_id = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=False)
    subjective_marks = models.IntegerField()
    objective_marks = models.IntegerField()
    total_marks = models.IntegerField()
    letter_grade = models.CharField(max_length=5)
