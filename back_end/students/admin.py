from django.contrib import admin
from .models import Student
from django.contrib.admin.widgets import AdminFileWidget
from django.db import models
from django.utils.safestring import mark_safe

from pdf_print.pdf_printer import render_to_pdf
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import resolve, path

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

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('print/', self.print_pdf),
        ]
        return my_urls + urls

    def print_pdf(self, request):
        data = {
            'today': 343,
            'amount': 39.99,
            'customer_name': 'Cooper Mann',
            'order_id': 1233434,
        }
        pdf = render_to_pdf('students/student_changeform.html', data)
        return HttpResponse(pdf, content_type='application/pdf')

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
            ('religion', 'nationality'), ('previous_class', 'previous_school'), ('current_class', 'roll_no'), ('tc_number', 'date'), 'photo')
        }),
        ('Extra Information', {
            'fields': ('employed_guardian_name', ('student_signature', 'guardian_signature', 'headmaster_signature'))
        }),
    )

    readonly_fields = (
        'username', 'password'
    )

admin.site.register(Student, StudentAdmin)