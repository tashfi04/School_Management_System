import datetime
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

def current_year():

    return datetime.date.today().year

class Session(models.Model):

    session = models.IntegerField(validators=[MinValueValidator(current_year()), MaxValueValidator(current_year() + 1)], null=True, blank=False)

    def __str__(self):
        return str(self.session)