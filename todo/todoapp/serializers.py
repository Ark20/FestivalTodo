from rest_framework import serializers
from todoapp.models import Task

class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = ['id','created','description']