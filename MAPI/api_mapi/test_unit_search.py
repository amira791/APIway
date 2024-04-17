from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import API
from .serializers import APISerializer


class SearchAPITestCase(APITestCase):

    def setUp(self):
        # Create sample API data
        api1 = API.objects.create(api_name="API 1", description="Description 1", category="Category A")
        api2 = API.objects.create(api_name="API 2", description="Description 2", category="Category B")
        api3 = API.objects.create(api_name="API with Functionalities", description="Has functionalities", category="Category A")
        # api3.apiversion_set.create(functName="Functionality 1")

    def test_search_by_name(self):
        url = reverse('search_api')
        data = {'query': 'API 1', 'search_field': 'Name'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer = APISerializer(API.objects.filter(api_name__icontains='API 1'), many=True)
        self.assertEqual(response.data, serializer.data)

    def test_search_by_description(self):
        url = reverse('search_api')
        data = {'query': 'Description', 'search_field': 'Description'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer = APISerializer(API.objects.filter(description__icontains='Description'), many=True)
        self.assertEqual(response.data, serializer.data)


    def test_search_by_functionalities(self):
        url = reverse('search_api')
        data = {'query': 'Functionalities', 'search_field': 'Functionalities'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer = APISerializer(API.objects.filter(apiversion__functions__functName__icontains='Functionalities'), many=True)
        self.assertEqual(response.data, serializer.data)

