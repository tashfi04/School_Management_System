from django.db import models
from django.contrib.auth.models import User
from django.db.models import F
from django.core.validators import MaxValueValidator, MinValueValidator

class Student(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    CLASS_CHOICES = [
        ('0', 'Nursery'),
        ('1', 'One'),
        ('2', 'Two'),
        ('3', 'Three'),
        ('4', 'Four'),
        ('5', 'Five'),
        ('6', 'Six'),
        ('7', 'Seven'),
        ('8', 'Eight'),
        ('9', 'Nine'),
        ('10', 'Ten',),
    ]

    user_name = models.CharField(primary_key=True, max_length=50, blank=True)
    password = models.CharField(max_length=20)
    duplicate_name_count = models.IntegerField(null=True, blank=True)

    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    place_of_birth = models.CharField(max_length=30)
    mother_name = models.CharField("Mother's name", max_length=100)
    father_name = models.CharField("Father's name", max_length=100)
    guardian_name = models.CharField("Guardian's name(applicaple if different from parents)", max_length=100)
    present_address = models.TextField()
    permanent_address = models.TextField()
    email = models.CharField(max_length=50)
    telephone = models.CharField("Telephone no.", max_length=11)
    emergency_telephone = models.CharField("Emergency telephone No.", max_length=11)
    religion = models.CharField(max_length=30)
    nationality = models.CharField(max_length=30)
    previous_class = models.IntegerField()
    previous_school = models.CharField(max_length=40)
    current_class = models.IntegerField(choices=CLASS_CHOICES)
    tc_number = models.CharField("T.C no.", max_length=50)
    date = models.DateField()
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')

    employed_guardian_name = models.CharField("Father/Mother's name", max_length=50)
    student_signature = models.ImageField("Student's signature", upload_to='photos/%Y/%m/%d/')
    guardian_signature = models.ImageField("Guardian's signature", upload_to='photos/%Y/%m/%d/')
    headmaster_signature = models.ImageField("Headmaster/Principal's signature", upload_to='photos/%Y/%m/%d/')

    def save(self, *args, **kwargs):
        first_name = self.name.split(' ', 1)[0]

        if Student.objects.filter(user_name=first_name).exists():
            existing_user = Student.objects.get(user_name=first_name)
            user_name = first_name + str(existing_user.duplicate_name_count)
            self.user_name = user_name

            Student.objects.filter(user_name=first_name).update(duplicate_name_count=F('duplicate_name_count') + 1)
        else:
            self.user_name = first_name
            self.duplicate_name_count = 1

        self.password = User.objects.make_random_password(
        length=10, allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789')

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name