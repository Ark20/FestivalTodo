from todoapp.models import Task
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
from rest_framework import viewsets
from todoapp.serializers import TaskSerializer


# Create your views here.

class TaskViewSet(viewsets.ModelViewSet):

  queryset = Task.objects.all()
  serializer_class = TaskSerializer
