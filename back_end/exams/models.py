from django.db import models

class ExamType(models.Model):

    exam_type = models.CharField(max_length=100, null=True, blank=False)
    exam_order = models.IntegerField(null=True, blank=False)

    def __str__(self):
        return self.exam_type

    class Meta:
        ordering = ['exam_order']
