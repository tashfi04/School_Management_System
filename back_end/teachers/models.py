from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models import F
from django.core.validators import MaxValueValidator, MinValueValidator

class Teacher(models.Model):

    Teacher = 1
    Headmaster = 2

    ROLE_CHOICES = [
        (Teacher, 'Teacher'),
        (Headmaster, 'Headmaster')
    ]

    MARITAL_STATUS_CHOICES = [
        ('MR', 'Married'),
        ('UM', 'Unmarried'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    username = models.CharField(primary_key=True, max_length=50, blank=True)
    password = models.CharField(max_length=20)
    #duplicate_name_count = models.IntegerField(null=True, blank=True)

    role = models.IntegerField(choices=ROLE_CHOICES, null=True, blank=False)

    name = models.CharField(max_length=100, null=True, blank=False)
    NID_no = models.CharField("NID no.:", max_length=100, null=True, blank=False)
    designation = models.CharField(max_length=100, null=True, blank=False)
    present_address = models.TextField(null=True, blank=False)
    office_telephone = models.CharField("Telephone no.(Office)", max_length=13, null=True, blank=False)
    home_telephone = models.CharField("Telephone no.(Home)",max_length=13, null=True, blank=False)
    office_mobile = models.CharField("Mobilephone no.(Office)",max_length=11, null=True, blank=False)
    personal_mobile = models.CharField("Mobilephone no.(Personal)",max_length=11, null=True, blank=False)
    fax = models.CharField(max_length=70, null=True, blank=False)
    email = models.EmailField(max_length=50, null=True, blank=False)
    date_of_join = models.DateField(null=True, blank=False)
    date_of_birth = models.DateField(null=True, blank=False)
    marital_status = models.CharField(max_length=2, choices=MARITAL_STATUS_CHOICES, null=True, blank=False)
    permanent_address = models.TextField(null=True, blank=False)
    highest_educational_qualification = models.CharField(max_length=50, null=True, blank=False)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/', null=True, blank=False)

    """
    Keeping a copy of the original password so that we don't have to do another DB lookup
    to check if the password was changed
    """
    originalPassword = None

    def __init__(self, *args, **kwargs):
        super(Teacher, self).__init__(*args, **kwargs)
        self.originalPassword = self.password

    def save(self, *args, **kwargs):
        if self._state.adding:
            first_name = self.name.split(' ', 1)[0]
            duplicate_name_count = None

            if get_user_model().objects.filter(username=first_name).exists():
                #existing_user = Teacher.objects.get(username=first_name)
                existing_user = get_user_model().objects.get(username=first_name)
                username = first_name + str(existing_user.duplicate_name_count)
                self.username = username

                #Teacher.objects.filter(username=first_name).update(duplicate_name_count=F('duplicate_name_count') + 1)
                get_user_model().objects.filter(username=first_name).update(duplicate_name_count=F('duplicate_name_count') + 1)
            else:
                self.username = first_name
                duplicate_name_count = 1

            self.password = get_user_model().objects.make_random_password(
            length=10, allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789')

            #experimental
            user = get_user_model().objects.create_user(self.username, self.email, self.password, role=self.role, duplicate_name_count=duplicate_name_count)
            self.user = user

        else:
            if (self.password) != self.originalPassword:
                get_user_model().objects.filter(pk=self.user_id).update(password=self.password)
            
            self.user.role = self.role
            self.user.save()

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

    #def __str__(self):
    #    return self.name
    

