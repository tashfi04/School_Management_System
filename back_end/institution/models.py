from django.db import models

class Institution(models.Model):

    #global information
    name = models.CharField(max_length = 200, null = True, blank = False)

    #home page information
    description = models.TextField(null = True, blank = True)
    home_background = models.ImageField("Homepage background photo", upload_to='photos/others/%Y/%m/%d/', null = True, blank = True)
    home_photo_1 = models.ImageField("Homepage photo 1", upload_to='photos/others/%Y/%m/%d/', null = True, blank = True)
    home_photo_2 = models.ImageField("Homepage photo 1", upload_to='photos/others/%Y/%m/%d/', null = True, blank = True)
    home_photo_3 = models.ImageField("Homepage photo 1", upload_to='photos/others/%Y/%m/%d/', null = True, blank = True)
    home_photo_4 = models.ImageField("Homepage photo 1", upload_to='photos/others/%Y/%m/%d/', null = True, blank = True)

    #about us page information
    overview = models.TextField(null = True, blank = True)

    #academic page information
    academic_overview = models.TextField(null = True, blank = True)
    academic_photo = models.ImageField("Academic page photo", upload_to='photos/others/%Y/%m/%d/', null = True, blank = True)

    def __str__(self):
        return self.name
