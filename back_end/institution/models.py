from django.db import models

class Institution(models.Model):

    #global information
    name = models.CharField(max_length=200, null=True, blank=False)

    #home page information
    description = models.TextField(null=True, blank=True)
    home_background = models.ImageField("Homepage Background Photo", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)
    home_photo_1 = models.ImageField("Homepage Photo 1", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)
    home_photo_2 = models.ImageField("Homepage Photo 1", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)
    home_photo_3 = models.ImageField("Homepage Photo 1", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)
    home_photo_4 = models.ImageField("Homepage Photo 1", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)

    #about us page information
    overview = models.TextField(null=True, blank=True)
    about_us_photo = models.ImageField("About Us Page Photo", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)

    #headmaster's speech page information
    headmaster_speech = models.TextField("Headmaster's Speech", null=True, blank=True)
    headmaster_photo = models.ImageField("Headmaster's Photo", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)

    #academic page information
    academic_overview = models.TextField(null=True, blank=True)
    academic_photo = models.ImageField("Academic Page Photo", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)

    #contact information
    phone_no = models.CharField("Phone No.(Office)", max_length=11, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class EventNews(models.Model):

    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    date = models.DateField(null=True, blank=False)
    title = models.CharField(max_length=250, null=True, blank=False)
    description = models.TextField(null=True, blank=False)
    photo = models.ImageField("Attached Photo", upload_to='photos/others/%Y/%m/%d/', null=True, blank=True)

    def __str__(self):
        return self.title
