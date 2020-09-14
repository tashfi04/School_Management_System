from django.contrib import admin
from .models import Class#, Subject, Exam

# class SubjectInline(admin.TabularInline):
#     model = Subject

# class ExamInline(admin.TabularInline):
#     model = Exam

class ClassAdmin(admin.ModelAdmin):
    list_display = ('name', 'group')#, 'class_teacher')
    list_per_page = 20

    fieldsets = (
        ('Class Information', {
            'fields': (('name', 'group'), 'class_teacher')
        }),
    )

    # inlines = [
    #     SubjectInline, ExamInline
    # ]

admin.site.register(Class, ClassAdmin)