from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    is_guardian = models.BooleanField(default=False)

    def __str__(self):
        return self.username
