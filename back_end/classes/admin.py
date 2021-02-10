from django.contrib import admin
from .models import Class, Subject, Exam, Routine
from django.urls import resolve, path
from functools import partial

from teachers.models import Teacher
from .routine import RoutineGenerator
from django.http import HttpResponseRedirect

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

class RoutineInline(admin.TabularInline):
    model = Routine
    extra = 1
    
    """
    Get the parent object id(class) being edited and filter subjects with that class
    """
    def get_formset(self, request, obj=None, **kwargs):
        kwargs['formfield_callback'] = partial(self.formfield_for_dbfield, request=request, obj=obj)
        return super().get_formset(request, obj, **kwargs)

    def formfield_for_dbfield(self, db_field, **kwargs):
        obj = kwargs.pop('obj', None)
        formfield = super().formfield_for_dbfield(db_field, **kwargs)
        if db_field.name == "saturday" and Class:
            formfield.queryset = Subject.objects.filter(related_class_id=obj)
        elif db_field.name == "sunday" and Class:
            formfield.queryset = Subject.objects.filter(related_class_id=obj)
        elif db_field.name == "monday" and Class:
            formfield.queryset = Subject.objects.filter(related_class_id=obj)
        elif db_field.name == "tuesday" and Class:
            formfield.queryset = Subject.objects.filter(related_class_id=obj)
        elif db_field.name == "wednesday" and Class:
            formfield.queryset = Subject.objects.filter(related_class_id=obj)
        elif db_field.name == "thursday" and Class:
            formfield.queryset = Subject.objects.filter(related_class_id=obj)
        return formfield

class ClassAdmin(admin.ModelAdmin):

    change_list_template = 'classes/classes_changeList.html'

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('create_routine/', self.create_routine),
            path('delete_routine/', self.delete_routine),
        ]
        return my_urls + urls

    def create_routine(self, request):
        class_list = Class.objects.all()
        max_class_a_day = 5
        routine_generator = RoutineGenerator()
        routine_generator.generateRoutine(class_list, max_class_a_day)
        
        if routine_generator.can_generate_routine:
            Routine.objects.bulk_create([Routine(**q) for q in routine_generator.routine_list])
            self.message_user(request, "Routines created")
        else:
           self.message_user(request, "Can not generate routine, no teacher available for class {}, period {}!".format(routine_generator.routine_generate_fail_output['class'], routine_generator.routine_generate_fail_output['period']))

        return HttpResponseRedirect("../")

    def delete_routine(self, request):
        Routine.objects.all().delete()
        self.message_user(request, "All routines have been deleted!")

        return HttpResponseRedirect("../")


    list_display = ('name', 'group', 'class_teacher')
    list_per_page = 20

    fieldsets = (
        ('Class Information', {
            'fields': (('name', 'group', 'class_order'), 'class_teacher', 'syllebus', ('total_students', 'total_class_in_a_day'), 'board_exam_evaluation')
        }),
    )

    inlines = [
        SubjectInline, ExamInline, RoutineInline
    ]

admin.site.register(Class, ClassAdmin)