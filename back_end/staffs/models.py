from django.db import models
#from django.contrib.auth import get_user_model
#from django.contrib.auth.models import User
#from django.conf import settings

from django.utils.safestring import mark_safe

class Staff(models.Model):

    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Others')
    ]

    #user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    #username = models.CharField(primary_key=True, max_length=50, blank=True)
    #password = models.CharField(max_length=20)
    
    name = models.CharField(max_length=100, null=True, blank=False)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=False)
    date_of_birth = models.DateField(null=True, blank=False)
    present_address = models.TextField(null=True, blank=False)
    permanent_address = models.TextField(null=True, blank=False)
    email = models.CharField(max_length=50, null=True, blank=True)
    telephone = models.CharField("Telephone no.", max_length=11, null=True, blank=False)
    religion = models.CharField(max_length=30, null=True, blank=False)
    
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/', null=True, blank=False)
    position = models.CharField(max_length=30, null=True, blank=False)

    def image_preview(self):
        # ex. the name of column is "image"
        if self.photo:
            return mark_safe('<img src="{0}" width="150" height="150" style="object-fit:contain" />'.format(self.photo.url))
        else:
            return '(No image)'

    image_preview.short_description = 'Preview'

    def __str__(self):
        return self.name