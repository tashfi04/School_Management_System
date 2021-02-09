from django.contrib import admin
from .models import Teacher, Qualifications
from django.contrib.admin.widgets import AdminFileWidget
from django.db import models
from django.utils.safestring import mark_safe

class AdminImageWidget(AdminFileWidget):

    def render(self, name, value, attrs=None, renderer=None):
        output = []

        if value and getattr(value, "url", None):
            image_url = value.url
            file_name = str(value)

            output.append(
                f' <a href="{image_url}" target="_blank">'
                f'  <img src="{image_url}" alt="{file_name}" width="150" height="150" '
                f'style="object-fit: cover;"/> </a>')

        output.append(super(AdminFileWidget, self).render(name, value, attrs, renderer))
        return mark_safe(u''.join(output))

class QualificationsInline(admin.TabularInline):
    model = Qualifications

class TeacherAdmin(admin.ModelAdmin):

    formfield_overrides = {models.ImageField: {'widget': AdminImageWidget}}

    list_display = ('name', 'designation')
    list_filter = ('designation',)
    search_fields = ('name', 'NID_no', 'office_telephone', 'home_telephone', 'office_mobile', 'personal_mobile', 'fax', 'email')
    list_per_page = 20

    fieldsets = (
        ('Account credentials', {
            'fields': (('username', 'password'), 'role')
        }),
        ('Basic information', {
            'fields': ('name', 'NID_no', 'designation', 'present_address')
        }),
        ('Contact information', {
            'fields': (('office_telephone', 'home_telephone'), ('office_mobile', 'personal_mobile'), 'fax', 'email')
        }),
        (None, {
            'fields': ('date_of_join',)
        }),
        ('Personal information', {
            'fields': (('date_of_birth', 'marital_status'), 'permanent_address', 'highest_educational_qualification', 'photo')
        }),
    )
    
    readonly_fields = (
        'username', 'password'
    )

    inlines = [
        QualificationsInline,
    ]


admin.site.register(Teacher, TeacherAdmin)
