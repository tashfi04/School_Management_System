from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

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

    syllebus = models.FileField(upload_to='uploads/syllebus/%Y/%m/%d', max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Classes"

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
    status = models.IntegerField(choices=STATUS_CHOICES, default=active, blank=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name', 'status']
    
class Exam(models.Model):

    related_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    exam_type = models.ForeignKey('exams.ExamType', on_delete=models.CASCADE, null=True, blank=False)
    exam_year = models.IntegerField(validators=[MinValueValidator(1900), MaxValueValidator(9999)], null=True, blank=False)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=True)
    class_test_marks = models.IntegerField(null=True, blank=False)
    term_subjective_marks = models.IntegerField(null=True, blank=False)
    term_subjective_pass_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)#verbose_name="subjective pass marks (in %)", null=True, blank=False)
    term_objective_marks = models.IntegerField(null=True, blank=False)
    term_objective_pass_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)#verbose_name="objective pass marks (in %)", null=True, blank=False)
    term_total_conversion = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Term test total marks conversion(in %)", null=True, blank=False)
    total_marks = models.IntegerField(null=True, blank=False)
    total_pass_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)#verbose_name="total pass marks (in %)", null=True, blank=False)

    def save(self, *args, **kwargs):

        # if (0 <= self.subjective_pass_marks):
        #     self.subjective_pass_marks = self.subjective_marks * self.subjective_pass_marks / 100
        # if (0 <= self.objective_pass_marks):
        #     self.objective_pass_marks = self.objective_marks * self.objective_pass_marks / 100
        # if (0 <= self.total_pass_marks):
        #     self.total_pass_marks = self.total_marks * self.total_pass_marks / 100
        # self.subjective_pass_marks = self.subjective_marks * self.subjective_pass_marks / 100
        # self.objective_pass_marks = self.objective_marks * self.objective_pass_marks / 100
        # self.total_pass_marks = self.total_marks * self.total_pass_marks / 100

        super().save(*args, **kwargs)

    def __str__(self):
        return '%s (%s) (%s)' % (str(self.subject), str(self.exam_type), str(self.exam_year))
