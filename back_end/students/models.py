from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models import F
from django.core.validators import MaxValueValidator, MinValueValidator

class Student(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Others')
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    username = models.CharField(primary_key=True, max_length=50, blank=True)
    password = models.CharField(max_length=20)
    #duplicate_name_count = models.IntegerField(null=True, blank=True)

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
    current_class = models.ForeignKey('classes.Class', on_delete=models.CASCADE)

    tc_number = models.CharField("T.C no.", max_length=50)
    date = models.DateField()
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')

    employed_guardian_name = models.CharField("Father/Mother's name", max_length=50)
    student_signature = models.ImageField("Student's signature", upload_to='photos/%Y/%m/%d/')
    guardian_signature = models.ImageField("Guardian's signature", upload_to='photos/%Y/%m/%d/')
    headmaster_signature = models.ImageField("Headmaster/Principal's signature", upload_to='photos/%Y/%m/%d/')

    """
    Keeping a copy of the original password so that we don't have to do another DB lookup
    to check if the password was changed
    """
    originalPassword = None

    def __init__(self, *args, **kwargs):
        super(Student, self).__init__(*args, **kwargs)
        self.originalPassword = self.password

    def save(self, *args, **kwargs):
        if self._state.adding:
            first_name = self.name.split(' ', 1)[0]
            duplicate_name_count = None

            #if Student.objects.filter(username=first_name).exists():
            if get_user_model().objects.filter(username=first_name).exists():
                existing_user = get_user_model().objects.get(username=first_name)
                username = first_name + str(existing_user.duplicate_name_count)
                self.username = username

                get_user_model().objects.filter(username=first_name).update(duplicate_name_count=F('duplicate_name_count') + 1)
            else:
                self.username = first_name
                duplicate_name_count = 1

            self.password = get_user_model().objects.make_random_password(
            length=10, allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789')

            #experimental
            user = get_user_model().objects.create_user(self.username, self.email, self.password, role=4, duplicate_name_count=duplicate_name_count)
            self.user = user
        
        else:
            if (self.password) != self.originalPassword:
                get_user_model().objects.filter(pk=self.user_id).update(password=self.password)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name