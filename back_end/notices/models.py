from django.db import models

class Notice(models.Model):

    general = 0
    class_related = 1

    NOTICE_TYPE_CHOICES = [
        (general, 'General'),
        (class_related, 'Class Related')
    ]

    notice_type = models.IntegerField(choices=NOTICE_TYPE_CHOICES, default=general, blank=False)

    date = models.DateField(auto_now_add=True)
    title = models.CharField(max_length=250, null=True, blank=False)
    description = models.TextField(null=True, blank=False)
    attachment = models.FileField(upload_to='uploads/notice/%Y/%m/%d', max_length=200, null=True, blank=True)

    def __str__(self):
        return self.title