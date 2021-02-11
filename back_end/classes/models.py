from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# from teachers.models import Teacher
# from .routine import RoutineGenerator

class Class(models.Model):

    GROUP_CHOICES = [
        ('Sci', 'Science'),
        ('Hum', 'Humanities'),
        ('Bus', 'Business Studies')
    ]

    name = models.CharField(max_length=20)
    class_order = models.IntegerField(null=True, blank=False)
    group = models.CharField(choices=GROUP_CHOICES, max_length=30, null=True, blank=True)
    class_teacher = models.OneToOneField('teachers.Teacher', on_delete=models.CASCADE, null=True, blank=True)
    total_students = models.IntegerField(null=True, blank=False)
    total_class_in_a_day = models.IntegerField(null=True, blank=False)

    syllebus = models.FileField(upload_to='uploads/syllebus/%Y/%m/%d', max_length=200, null=True, blank=True)

    board_exam_evaluation = models.BooleanField(default=False, blank=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Classes"
        ordering = ['class_order']

class Subject(models.Model):

    Main = 0
    Optional = 1

    SUBJECT_TYPE_CHOICES = [
        (Main, 'Main'),
        (Optional, 'Optional')
    ]

    active = 0
    inactive = 1

    STATUS_CHOICES = [
        (active, 'Active'),
        (inactive, 'Inactive')
    ]

    related_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    subject_type = models.IntegerField(choices=SUBJECT_TYPE_CHOICES, null=True, blank=False)
    teacher = models.ForeignKey('teachers.Teacher', on_delete=models.CASCADE, null=True, blank=True)
    total_class_in_a_week = models.IntegerField(null=True, blank=False)
    status = models.IntegerField(choices=STATUS_CHOICES, default=active, blank=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['status', 'name']
    
class Exam(models.Model):

    related_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    exam_type = models.ForeignKey('exams.ExamType', on_delete=models.CASCADE, null=True, blank=False)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=True)
    class_test_marks = models.IntegerField(null=True, blank=False)
    term_subjective_marks = models.IntegerField(null=True, blank=False)
    term_subjective_pass_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)#verbose_name="subjective pass marks (in %)", null=True, blank=False)
    term_objective_marks = models.IntegerField(null=True, blank=False)
    term_objective_pass_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)#verbose_name="objective pass marks (in %)", null=True, blank=False)
    term_total_conversion = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Term test total marks conversion(in %)", null=True, blank=False)
    lab_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)
    lab_pass_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)
    #total_marks = models.IntegerField(null=True, blank=False)
    #total_pass_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)#verbose_name="total pass marks (in %)", null=True, blank=False)

    class Meta:
        ordering = ['subject',]

    def __str__(self):
        return '%s (%s)' % (str(self.subject), str(self.exam_type))


class Routine(models.Model):

    related_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    period = models.IntegerField(null=True, blank=False)
    saturday = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='saturday', null=True, blank=True)
    sunday = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='sunday', null=True, blank=True)
    monday = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='monday', null=True, blank=True)
    tuesday = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='tuesday', null=True, blank=True)
    wednesday = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='wednesday', null=True, blank=True)
    thursday = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='thursday', null=True, blank=True)

    # def save(self, *args, **kwargs):

    #     if self._state .adding:

    #         class_list = Class.objects.all()
    #         teacher_list = Teacher.objects.all()

    #         max_class_a_day = 5


    #     super().save(*args, **kwargs)


