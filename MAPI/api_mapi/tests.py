from django.test import TestCase, Client

from api_mapi.models import APIForum, Consommateur, Thread  # Assuming Django framework


class TestForumViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.forum = APIForum.objects.create(name="Test Forum", description="This is a test forum" , api_id = 1)
        self.user = Consommateur.objects.create(username="test_user", password="password")  # Assuming user creation

    def test_create_thread(self):
        self.client.login(username="test_user", password="password")
        data = {"content": "Test Thread"}
        response = self.client.post(f'/api/forums/{self.forum.id}/threads/', data=data, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Thread.objects.count(), 1)

    def test_create_thread_unauthenticated(self):
        data = {"content": "Test Thread"}
        response = self.client.post(f'/api/forums/{self.forum.id}/threads/', data=data, content_type='application/json')
        self.assertEqual(response.status_code, 401)  # Expected unauthorized error

    def test_create_thread_invalid_data(self):
        self.client.login(username="test_user", password="password")
        data = {}  # Empty data
        response = self.client.post(f'/api/forums/{self.forum.id}/threads/', data=data, content_type='application/json')
        self.assertEqual(response.status_code, 400)  # Expected bad request error
        self.assertIn('content', response.json())  # Check for specific error message in response

    def test_list_threads(self):
        self.client.login(username="test_user", password="password")
        thread = Thread.objects.create(content="Test Thread 1", forum=self.forum, creator=self.user)
        response = self.client.get(f'/api/forums/{self.forum.id}/threads/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['content'], thread.content)

    def test_list_threads_empty(self):
        self.client.login(username="test_user", password="password")
        response = self.client.get(f'/api/forums/{self.forum.id}/threads/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 0)
