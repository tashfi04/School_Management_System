from django.db import models
from django.contrib.auth.models import User
from django.db.models import F
from django.core.validators import MaxValueValidator, MinValueValidator

class Teacher(models.Model):
    MARITAL_STATUS_CHOICES = [
        ('MR', 'Married'),
        ('UM', 'Unmarried'),
    ]

    user_name = models.CharField(primary_key=True, max_length=50, blank=True)
    password = models.CharField(max_length=20)
    duplicate_name_count = models.IntegerField(null=True, blank=True)

    name = models.CharField(max_length=100)
    NID_no = models.CharField("NID no.:", max_length=100)
    designation = models.CharField(max_length=100)
    present_address = models.TextField()
    office_telephone = models.CharField("Telephone no.(Office)", max_length=13)
    home_telephone = models.CharField("Telephone no.(Home)",max_length=13)
    office_mobile = models.CharField("Mobilephone no.(Office)",max_length=11)
    personal_mobile = models.CharField("Mobilephone no.(Personal)",max_length=11)
    fax = models.CharField(max_length=70)
    email = models.CharField(max_length=50)
    date_of_join = models.DateField()
    date_of_birth = models.DateField()
    marital_status = models.CharField(max_length=2, choices=MARITAL_STATUS_CHOICES)
    permanent_address = models.TextField()
    highest_educational_qualification = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')

    def save(self, *args, **kwargs):
        first_name = self.name.split(' ', 1)[0]

        if Teacher.objects.filter(user_name=first_name).exists():
            existing_user = Teacher.objects.get(user_name=first_name)
            user_name = first_name + str(existing_user.duplicate_name_count)
            self.user_name = user_name

            Teacher.objects.filter(user_name=first_name).update(duplicate_name_count=F('duplicate_name_count') + 1)
        else:
            self.user_name = first_name
            self.duplicate_name_count = 1

        self.password = User.objects.make_random_password(
        length=10, allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789')

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Qualifications(models.Model):
    id_name = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    exam_name = models.CharField(max_length=50)
    year = models.IntegerField(validators=[MinValueValidator(1900), MaxValueValidator(9999)])
    institute = models.CharField(max_length=70)
    board = models.CharField(max_length=50)
    result = models.CharField(max_length=10)