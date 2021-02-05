from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])

def apiOverview(request):

    api_urls = {
        'API Overview'                              : 'api/v1/',

        'Basic Information Related API'             : '--------------------------------------------------------------------------',
        'Institution Details'                       : 'api/v1/institution/details/',
        'Homepage Details'                          : 'api/v1/institution/homepage_details/',
        'About Us Details'                          : 'api/v1/institution/about_us/details/',
        'Headmaster\'s Speech'                      : 'api/v1/institution/about_us/headmaster_speech/',
        'Academic Details'                          : 'api/v1/institution/academic_details/',
        'Contact Information'                       : 'api/v1/institution/contact_info/',
        'Event List'                                : 'api/v1/institution/events/list/',
        'Event Details'                             : 'api/v1/institution/events/<str:event_pk>/details/',

        'Teacher Related API'                       : '--------------------------------------------------------------------------',
        'Teacher List'                              : 'api/v1/teachers/list/',
        'Teacher Details'                           : 'api/v1/teachers/details/',
        'Teacher Subject List'                      : 'api/v1/teachers/<str:teacher_pk>/subjects/list/',

        'Student Related API'                       : '--------------------------------------------------------------------------',
        'Student Details'                           : 'api/v1/students/details/',

        'Class Related API'                         : '--------------------------------------------------------------------------',
        'Class List'                                : 'api/v1/classes/list/',
        'Class Details'                             : 'api/v1/classes/<str:class_pk>/details/',
        'Class Students List'                       : 'api/v1/classes/<str:class_pk>/students/list/',
        'Class Exam Type List'                      : 'api/v1/classes/<str:class_pk>/exam_types/list/',
        #class transfer api (not added yet)

        'Subject Related API'                       : '--------------------------------------------------------------------------',
        'Subject List'                              : 'api/v1/classes/<str:class_pk>/subjects/list/',
        'Subject Details'                           : 'api/v1/classes/subjects/<str:subject_pk>/details/',
        'Subject Exam List'                         : '/api/v1/classes/subjects/<str:subject_pk>/exams/list/',

        'Exam Type Related API'                     : '--------------------------------------------------------------------------',
        'Exam Type Details'                         : 'api/v1/exam_types/<str:exam_type_pk>/details/'

        'Result Related API'                        : '--------------------------------------------------------------------------(updated)',
        'Marksheet List Create Update'              : 'api/v1/results/marksheet/<str:exam_pk>/',

        'Session List'                              : 'api/v1/results/search_options/sessions/list/',
        'Session Based Class List'                  : 'api/v1/results/search_options/classes/<str:session_pk>/list/',
        'Session and Class Based Subject List'      : 'api/v1/results/search_options/subjects/<str:session_pk>/<str:class_pk>/list/', 
        'Session and Class Based Exam Type List'    : 'api/v1/results/search_options/exam_types/<str:session_pk>/<str:class_pk>/list/',
        
        'Tabulationsheet List'                      : 'api/v1/results/tabulationsheet/<str:session_pk>/<str:class_pk>/<str:exam_type_pk>/list/',
        'Class Test Details'                        : 'api/v1/results/marksheet/class_test/<str:session_pk>/<str:subject_pk>/<str:exam_type_pk>/details/',
        'Term Test Details'                         : 'api/v1/results/marksheet/term_test/<str:session_pk>/<str:subject_pk>/<str:exam_type_pk>/details/',
        'Lab Test Details'                          : 'api/v1/results/marksheet/lab/<str:session_pk>/<str:subject_pk>/<str:exam_type_pk>/details/',
        'Combined Test Details'                     : 'api/v1/results/marksheet/combined_test/<str:session_pk>/<str:subject_pk>/<str:exam_type_pk>/details/',

        'Notice Related API'                        : '--------------------------------------------------------------------------',
        'Notice List'                               : 'api/v1/notices/<str:notice_type>/list/',
        'Notice Details'                            : 'api/v1/notices/<str:notice_pk>/details/'
    }

    return Response(api_urls)

# Create your views here.
