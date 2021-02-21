from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.admin.templatetags.admin_urls import add_preserved_filters
from django.contrib.admin.widgets import AdminFileWidget
from django.db import models
from django.utils.safestring import mark_safe
from .models import Student

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


class StudentAdmin(admin.ModelAdmin):

    change_form_template = 'students/student_changeform.html'
    formfield_overrides = {models.ImageField: {'widget': AdminImageWidget}}

    def response_change(self, request, obj):
        opts = self.model._meta
        pk_value = obj._get_pk_val()
        preserved_filters = self.get_preserved_filters(request)

        if "_customaction" in request.POST:
            # handle the action on your obj
            redirect_url = reverse('generate-pdf',
                               args=(pk_value,),
                               current_app=self.admin_site.name)
            redirect_url = add_preserved_filters({'preserved_filters': preserved_filters, 'opts': opts}, redirect_url)
            return HttpResponseRedirect(redirect_url)
        else:
            return super(StudentAdmin, self).response_change(request, obj)
  
    list_display = ('name',)
    #list_filter = ('designation',)
    #search_fields = ('name', 'NID_no', 'office_telephone', 'home_telephone', 'office_mobile', 'personal_mobile', 'fax', 'email')
    list_per_page = 20

    fieldsets = (
        ('Account Credentials', {
            'fields': (('username', 'password'))
        }),
        ('Basic Information', {
            'fields': ('name', ('gender', 'date_of_birth', 'place_of_birth'), 'mother_name', 'father_name',
            'guardian_name', 'present_address', 'permanent_address', 'email', ('telephone', 'emergency_telephone'),
            ('religion', 'nationality'), 'previous_school', ('current_class', 'roll_no'), 'photo')
        }),
        ('Extra Information', {
            'fields': (('student_signature', 'guardian_signature', 'headmaster_signature'))
        }),
    )

    readonly_fields = (
        'username', 'password'
    )

admin.site.register(Student, StudentAdmin)