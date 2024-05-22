from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from .models import Ticket, TicketResponse,APIForum, Thread, Comment, Fournisseur, Consommateur, API

User = get_user_model()

# class APIForumTests(TestCase):

#     def setUp(self):
#         self.user = User.objects.create_user(email='user@example.com', username='user', password='password')
#         self.provider = Fournisseur.objects.create(user=self.user)
#         self.forum = APIForum.objects.create(name='Test Forum', description='Forum description')

#     def test_get_forums(self):
#         client = Client()
#         url = reverse('apiforum-list')
#         response = client.get(url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)


# class ThreadTests(APITestCase):

#     def setUp(self):
#         self.user = User.objects.create_user(email='user@example.com', username='user', password='password')
#         self.consumer = Consommateur.objects.create(user=self.user)
#         self.forum = APIForum.objects.create(name='Test Forum', description='Forum description')
#         self.thread = Thread.objects.create(content='Test Thread', forum=self.forum, creator=self.consumer)

#     def test_create_thread(self):
#         client = Client()
#         url = reverse('threads-list')
#         data = {'content': 'New Thread', 'forum': self.forum.id_forum, 'creator': self.consumer.id_consommateur}
#         response = client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Thread.objects.count(), 2)

#     def test_get_threads(self):
#         client = Client()
#         url = reverse('forum_threads', args=[self.forum.id_forum])
#         response = client.get(url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)


# class CommentTests(APITestCase):

#     def setUp(self):
#         self.user = User.objects.create_user(email='user@example.com', username='user', password='password')
#         self.consumer = Consommateur.objects.create(user=self.user)
#         self.forum = APIForum.objects.create(name='Test Forum', description='Forum description')
#         self.thread = Thread.objects.create(content='Test Thread', forum=self.forum, creator=self.consumer)
#         self.comment = Comment.objects.create(message='Test Comment', thread=self.thread, created_by=self.user)

#     def test_create_comment(self):
#         client = Client()
#         url = reverse('comments-list')
#         data = {'message': 'New Comment', 'thread': self.thread.id_thread, 'created_by': self.user.id}
#         response = client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Comment.objects.count(), 2)

#     def test_get_comments(self):
#         client = Client()
#         url = reverse('thread_comments', args=[self.thread.id_thread])
#         response = client.get(url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)


class TicketTests(APITestCase):

    def setUp(self):
        self.provider = Fournisseur.objects.create(user=User.objects.create_user(email='provider@example.com', username='provider', password='password'))
        self.consumer = Consommateur.objects.create(user=User.objects.create_user(email='consumer@example.com', username='consumer', password='password'))
        self.api = API.objects.create(api_name='Test API', provider=self.provider)
        self.ticket = Ticket.objects.create(api_id=self.api, created_by=self.consumer, title='Test Ticket', issue='Test Issue')

    def test_create_ticket(self):
        client = Client()
        url = reverse('tickets-list')
        data = {'api_id': self.api.id_api, 'created_by': self.consumer.id_consommateur, 'title': 'New Ticket', 'issue': 'New Issue'}
        response = client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Ticket.objects.count(), 2)

    def test_get_tickets(self):
        client = Client()
        url = reverse('tickets-list')
        response = client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_close_ticket(self):
        client = Client()
        url = reverse('close_ticket', args=[self.ticket.ticket_id])
        response = client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.ticket.refresh_from_db()
        self.assertEqual(self.ticket.status, 'closed')

    def test_open_ticket(self):
        self.ticket.status = 'closed'
        self.ticket.save()
        client = Client()
        url = reverse('open_ticket', args=[self.ticket.ticket_id])
        response = client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.ticket.refresh_from_db()
        self.assertEqual(self.ticket.status, 'open')

    def test_get_tickets_by_provider(self):
        client = Client()
        url = reverse('tickets_by_provider', args=[self.provider.id_fournisseur])
        response = client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_tickets_by_consumer(self):
        client = Client()
        url = reverse('tickets_by_consumer', args=[self.consumer.id_consommateur])
        response = client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class TicketResponseTests(APITestCase):

    def setUp(self):
        self.provider = Fournisseur.objects.create(user=User.objects.create_user(email='provider@example.com', username='provider', password='password'))
        self.consumer = Consommateur.objects.create(user=User.objects.create_user(email='consumer@example.com', username='consumer', password='password'))
        self.api = API.objects.create(api_name='Test API', provider=self.provider)
        self.ticket = Ticket.objects.create(api_id=self.api, created_by=self.consumer, title='Test Ticket', issue='Test Issue')
        self.user = User.objects.create_user(email='user@example.com', username='user', password='password')
        self.ticket_response = TicketResponse.objects.create(ticket=self.ticket, created_by=self.user, response_text='Test Response')

    def test_create_ticket_response(self):
        client = Client()
        url = reverse('ticket_responses', args=[self.ticket.ticket_id])
        data = {'ticket': self.ticket.ticket_id, 'response_text': 'New Response', 'created_by': self.consumer.id_consommateur}
        response = client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
