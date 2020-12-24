from django.contrib import admin
from .models import Staff


class StaffAdmin(admin.ModelAdmin):

    list_display = ('name',)
    #list_filter = ('designation',)
    #search_fields = ('name', 'NID_no', 'office_telephone', 'home_telephone', 'office_mobile', 'personal_mobile', 'fax', 'email')
    list_per_page = 20

    fields = (
        'image_preview',
        ('name', 'photo'), ('date_of_birth', 'gender'), 'religion', 'position', 'present_address',
        'permanent_address', ('email', 'telephone')
    )

    readonly_fields = ('image_preview',)


admin.site.register(Staff, StaffAdmin)