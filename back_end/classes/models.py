from django.db import models
from teachers.models import Teacher

class Class(models.Model):

    GROUP_CHOICES = [
        ('Sci', 'Science'),
        ('Hum', 'Humanities'),
        ('Bus', 'Business Studies')
    ]

    CLASS_TEACHER_CHOICES = Teacher.objects.values_list('username', 'name')


    name = models.CharField(max_length=20)
    group = models.CharField(choices=GROUP_CHOICES, max_length=30)
    #class_teacher = models.CharField(choices=CLASS_TEACHER_CHOICES, max_length=100)
    class_teacher_username = models.OneToOneField(Teacher, on_delete=models.CASCADE, choices=CLASS_TEACHER_CHOICES, null=True, blank=True) 
    #students = 

    def __str__(self):
        return self.name

class Subject(models.Model):

    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)


class Exam(models.Model):

    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    exam_name = models.CharField(max_length=50)
    subjective_marks = models.IntegerField()
    objective_marks = models.IntegerField()
    total_marks = models.IntegerField()

