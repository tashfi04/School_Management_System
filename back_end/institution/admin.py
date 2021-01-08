from django.contrib import admin
from .models import Institution, EventNews

class EventNewsInline(admin.StackedInline):
    model = EventNews
    extra = 1

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
            'fields': ('overview', 'about_us_photo')
        }),
        ('Headmaster\'s Speech Page Information', {
            'fields': ('headmaster_speech', 'headmaster_photo')
        }),
        ('Academic Page Information', {
            'fields': ('academic_overview', 'academic_photo')
        }),
        ('Contact Information', {
            'fields': (('phone_no', 'email'), 'address')
        })
    )

    inlines = [
        EventNewsInline,
    ]

admin.site.register(Institution, InstitutionAdmin)
