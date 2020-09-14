from django.contrib import admin
from .models import Subject, Exam

class ExamInline(admin.TabularInline):
    model = Exam

class SubjectAdmin(admin.ModelAdmin):


    fieldsets = (
        ('Subject', {
            'fields': (('class_name', 'name'), 'teacher_name')
        }),
    )

    inlines = [
        ExamInline,
    ]

admin.site.register(Subject, SubjectAdmin)