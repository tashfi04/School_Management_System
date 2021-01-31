from django.contrib import admin
from .models import Class, Subject, Exam
from django.urls import resolve
from functools import partial

class SubjectInline(admin.TabularInline):
    model = Subject

class ExamInline(admin.TabularInline):
    model = Exam
    
    """
    Get the parent object id(class) being edited and filter subjects with that class
    """
    def get_formset(self, request, obj=None, **kwargs):
        kwargs['formfield_callback'] = partial(self.formfield_for_dbfield, request=request, obj=obj)
        return super().get_formset(request, obj, **kwargs)

    def formfield_for_dbfield(self, db_field, **kwargs):
        obj = kwargs.pop('obj', None)
        formfield = super().formfield_for_dbfield(db_field, **kwargs)
        if db_field.name == "subject" and Class:
            formfield.queryset = Subject.objects.filter(related_class_id=obj)
        return formfield


class ClassAdmin(admin.ModelAdmin):

    list_display = ('name', 'group', 'class_teacher')
    list_per_page = 20

    fieldsets = (
        ('Class Information', {
            'fields': (('name', 'group', 'class_order'), 'class_teacher', 'syllebus')
        }),
    )

    inlines = [
        SubjectInline, ExamInline
    ]

admin.site.register(Class, ClassAdmin)