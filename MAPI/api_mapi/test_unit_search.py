from django.test import TestCase, Client
from rest_framework import status
from django.db.models import Q
from .models import API, APIcategory
from .serializers import APISerializer
from .views import search_api
from rest_framework.response import Response
from rest_framework.decorators import api_view

class SearchAPITestCase(TestCase):
    def setUp(self):
        # Create test data for APIcategory objects
        category_test = APIcategory.objects.create(label='Test')
      
        # Create test data for API objects
        API.objects.create(api_name='Facebook API', description='API for accessing Facebook data and functionality', category=category_test)
        

    def test_search_api_by_name(self):
        client = Client()
        response = client.post('/api/search/', {'query': 'Facebook API', 'filter': 'Name'}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['api_name'], 'Facebook API')


    def test_search_api_by_description(self):
       client = Client()
       response = client.post('/api/search/', {'query': 'Facebook', 'filter': 'Description'}, content_type='application/json')
       self.assertEqual(response.status_code, status.HTTP_200_OK)
       self.assertEqual(len(response.data), 1)


    def test_search_api_by_category(self):
       client = Client()
       response = client.post('/api/search/', {'query': 'Test', 'filter': 'Category'}, content_type='application/json')
       self.assertEqual(response.status_code, status.HTTP_200_OK)
       self.assertEqual(len(response.data), 1)
       self.assertEqual(response.data[0]['api_name'], 'Facebook API')

    def test_search_api_by_functionalities(self):
      client = Client()
      response = client.post('/api/search/', {'query': 'Search', 'filter': 'Functionalities'}, content_type='application/json')
      self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # Define the expected number of results based on your test data
      expected_number_of_results = 0
    
      self.assertEqual(len(response.data), expected_number_of_results)

 

   