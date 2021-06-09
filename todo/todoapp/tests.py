from django.test import TestCase
from rest_framework.test import APIClient
from .models import Task 

# Create your tests here.
class Sample(TestCase):
    def test_reggie(self): #define a test 
      newTask = Task(description="help") #make a new task 
      newTask.save()
      client = APIClient() #use api client to run api 
      tasks = client.get('/task/') #store data retrieved from get
      print(tasks.data)
      self.assertIn(newTask.description,tasks.data[0].values()) #check that new task is included
    