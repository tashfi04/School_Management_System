from django.contrib import admin
from .models import Student

class StudentAdmin(admin.ModelAdmin):

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
            ('religion', 'nationality'), ('previous_class', 'previous_school'), 'current_class', ('tc_number', 'date'), 'photo')
        }),
        ('Extra Information', {
            'fields': ('employed_guardian_name', ('student_signature', 'guardian_signature', 'headmaster_signature'))
        }),
    )

    readonly_fields = (
        'username', 'password'
    )

admin.site.register(Student, StudentAdmin)