from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from teachers.models import Teacher
from teachers.serializers import TeachersSerializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes(())
def teacher_profile(request):
    if request.method == 'GET':
        #serializer = StudentsSerializer(data = request.data["username"])
        #if serializer.is_valid():
        #    student = student.object.all()
        #    return Response(serializer.data)
        #return Response(serializer.error)
        teachers = Teacher.objects.all().filter(username=request.GET['username'])
        print(request.GET['username'])
        serializer = TeachersSerializers(teachers, many= True)
        return Response(serializer.data)

# Create your views here.
