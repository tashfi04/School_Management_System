from django.db import models

class Exam(models.Model):

    exam_name = models.CharField(max_length=100)

    def __str__(self):
        return self.exam_name

