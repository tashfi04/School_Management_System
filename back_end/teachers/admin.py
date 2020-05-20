from django.contrib import admin
from .models import Teacher, Qualifications

class QualificationsInline(admin.TabularInline):
    model = Qualifications

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation')
    list_filter = ('designation',)
    search_fields = ('name', 'NID_no', 'office_telephone', 'home_telephone', 'office_mobile', 'personal_mobile', 'fax', 'email')
    list_per_page = 20

    fieldsets = (
        ('Account credentials', {
            'fields': (('user_name', 'password'))
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
        'user_name', 'password'
    )

    inlines = [
        QualificationsInline,
    ]


admin.site.register(Teacher, TeacherAdmin)
