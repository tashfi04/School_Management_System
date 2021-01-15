from django.db import models

class ExamType(models.Model):

    exam_type = models.CharField(max_length=100)

    def __str__(self):
        return self.exam_type

