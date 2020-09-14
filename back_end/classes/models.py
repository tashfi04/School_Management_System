from django.db import models
from teachers.models import Teacher
from django.core.validators import MaxValueValidator, MinValueValidator

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
    class_teacher = models.OneToOneField(Teacher, on_delete=models.CASCADE, choices=CLASS_TEACHER_CHOICES, null=True, blank=True) 
    #students = 

    def __str__(self):
        return self.name

# class Subject(models.Model):

#     TEACHER_CHOICES = Teacher.objects.values_list('username', 'name')

#     related_class = models.ForeignKey(Class, on_delete=models.CASCADE)
#     name = models.CharField(max_length=50)
#     teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, choices=TEACHER_CHOICES, null=True, blank=True)
    
# class Exam(models.Model):

#     class_id = models.ForeignKey(Class, on_delete=models.CASCADE)

#     #SUBJECT_CHOICES = Subject.objects.filter(exam__class_id=class_id).values_list('id', 'name')

#     #SUBJECT_CHOICES = Subject.objects.filter(name='English')

#     exam_name = models.CharField(max_length=50)
#     exam_year = models.IntegerField(validators=[MinValueValidator(1900), MaxValueValidator(9999)], null=True, blank=False)
#     #subject = models.ForeignKey(Subject, on_delete=models.CASCADE, choices=SUBJECT_CHOICES, null=True, blank=True)
#     subjective_marks = models.IntegerField()
#     objective_marks = models.IntegerField()
#     total_marks = models.IntegerField()

# class MarksSheet(models.Model):

#     exam_id = models.ForeignKey(Exam, on_delete=models.CASCADE, null=True, blank=False)
#     student_id = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
#     subject_id = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=False)
#     subjective_marks = models.IntegerField()
#     objective_marks = models.IntegerField()
#     total_marks = models.IntegerField()
#     letter_grade = models.CharField(max_length=5)


