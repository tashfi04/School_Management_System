from django.contrib import admin
from .models import Institution

class InstitutionAdmin(admin.ModelAdmin):

    list_display = ('name',)

    fieldsets = (
        (None, {
            'fields': ('name',)
        }),
        ('Home Page Information', {
            'fields': ('description', 'home_background', ('home_photo_1', 'home_photo_2'),
            ('home_photo_3', 'home_photo_4'))
        }),
        ('About Us Page Information', {
            'fields': ('overview',)
        }),
        ('Academic Page Information', {
            'fields': ('academic_overview', 'academic_photo')
        }),
    )

admin.site.register(Institution, InstitutionAdmin)
