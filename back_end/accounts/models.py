from django.db import models
from django.contrib.auth.models import AbstractUser, Group

#permission_list = [ca]

#group, created = Group.objects.get_or_create(name='Headmaster')   
#if created:
#    group.permissions.add(can_read_campaign)
#    logger.info('read_only_user Group created')

class User(AbstractUser):

    Administrator = 0
    Teacher = 1
    Headmaster = 2
    Student = 3
    

    ROLE_CHOICES = [
        (Administrator, 'Administrator'),
        (Teacher, 'Teacher'),
        (Headmaster, 'Headmaster'),
        (Student, 'Student')
    ]

    role = models.IntegerField(choices=ROLE_CHOICES, null=True, blank=False)

    duplicate_name_count = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.username
