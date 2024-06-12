from rest_framework import generics , status
from api_mapi.models import *
from api_mapi.serializers import *
from api_mapi.models import Abonnement,Tarification
from api_mapi.serializers import AbonnementSerializer
from django.conf import settings
from django.db.models import Q
from django.http import JsonResponse
from rest_framework import viewsets
from django.db.models import Min, Max
from django.db.models import OuterRef, Subquery
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import get_user_model
from .document import APIDocument
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Q, Index
from django.utils.text import slugify
import re
from django.db.models import Min, Max





from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.shortcuts import render
from rest_framework.response import Response



from datetime import datetime
import string, random

import stripe


ELASTIC_HOST = 'http://localhost:9200/'

# Create the client instance
client = Elasticsearch(
    [ELASTIC_HOST],
    basic_auth=('hadilane', '123456789')
)



@api_view(['POST'])
def index_api(request):
    api_data = request.data  # Get API data from request

    # Serialize API data
    serializer = APISerializer(data=api_data)
    if serializer.is_valid():
        api_instance = serializer.save()

        # Index data in Elasticsearch
        doc = APIDocument(
            meta={'id': api_instance.id_api},
            api_name=api_instance.api_name,
            description=api_instance.description,
            category={
                'label': api_instance.category.label
            },
            functions=[{'functName': func.functName} for func in api_instance.functions.all()]
        )
        doc.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# Import necessary modules
from elasticsearch_dsl import Q

@api_view(['POST'])
def search_api(request, index='api_index'):
    query = request.data.get('query', '')
    search_field = request.data.get('filter')
    category_label = request.data.get('category')

    # Split the query string into individual words
    query_words = query.split()

    # Preprocess each word of the query string
    processed_query_words = []
    for word in query_words:
        processed_word = re.sub(r'\W+', '', word)  # Remove special characters
        processed_word = slugify(processed_word)  # Convert spaces and special characters to hyphens
        processed_query_words.append(processed_word)

    # Define Elasticsearch multi_match query
    if search_field == 'Name':
        search_fields = ["api_name^3", "category.label^2"]
    elif search_field == 'Description':
        search_fields = ["description^3"]
    elif search_field == 'Category':
        search_fields = ["category.label^3"]
    elif search_field == 'Functionalities':
        search_fields = ["functions.functName^3"]
    else:
        return Response({'error': 'Invalid search field'}, status=status.HTTP_400_BAD_REQUEST)

    # Building query for each processed word
    queries = []
    for processed_word in processed_query_words:
        query_string = "*" + processed_word + "*"  # Adding wildcard characters to the processed word
        reversed_query_string = "*" + processed_word[::-1] + "*"  # Adding wildcard characters to the reversed processed word

        #  fuzziness in the query_string part
        fuzziness = 'AUTO'  
        query = Q('bool',
                  should=[
                      Q('query_string', query=query_string, fields=search_fields, fuzziness=fuzziness),
                      Q('query_string', query=reversed_query_string, fields=search_fields, fuzziness=fuzziness)
                  ],
                  minimum_should_match=1)
        queries.append(query)

    # Combine queries with a boolean OR
    combined_query = Q('bool', should=queries)

    sort = '_score'  # Tri par défaut (pertinence)

    # Execute elasticsearch query
    search = Search(index=index).using(client).query(combined_query).sort(sort)

    # Filter by category if provided
    if category_label and category_label != 'All':
        search = search.filter('match_phrase', category__label=category_label)

    # Execute the search
    results = search.execute()

    # Construct response data
    response_data = []

    for hit in results:
        response_data.append({
            'id_api': hit.meta.id,
            'api_name': hit.api_name,
            'description': hit.description,
            'terms_of_use': hit.terms_of_use,
            'logo': hit.logo,
            'visibility': hit.visibility,
            'website': hit.website,
            'category_label': hit.category.label,
            'functions': [func.functName for func in hit.functions]  # assuming functions is a related field
        })

    return Response(response_data)
stripe.api_key = settings.STRIPE_TEST_SECRET_KEY


@api_view(['Post'])
def addUser(request):
    name = request.data.get('name')
    email = request.data.get('email')

    try:
        existing_customer = stripe.Customer.list(email=email, limit=1)
        if existing_customer.data:
            return Response({'stripe_customer_id': existing_customer.data[0].stripeCustomerId}, status=status.HTTP_200_OK)
        else:

            stripe_customer = stripe.Customer.create(
                email=email,
                name=name
            )
            return Response({'stripe_customer_id': stripe_customer.id}, status=status.HTTP_201_CREATED)
    except stripe.error.StripeError as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


def generate_api_key(length=40):
    characters = string.ascii_letters + string.digits
    api_key = ''.join(random.choice(characters) for _ in range(length))
    return api_key



@api_view(['Post'])
def subscribe(request):
    customerId = "cus_Q4AcDyR9VnKBet"
    userId = request.data.get('userId')
    userName = request.data.get('userName')
    userEmail = request.data.get('userEmail')
    tarificationId = request.data.get('tarificationId')


    customers = stripe.Customer.list(email=userEmail)
    if customers.data:
        customerId = customers.data[0].id
    else:
        stripe_customer = stripe.Customer.create(
                name=userName,
                email=userEmail
            )
        customerId = stripe_customer.id


    tarification = Tarification.objects.filter(id_tarif= tarificationId)[0]

    apiId = tarification.pricingModel.api.id_api;
    token = request.data.get('token')
    method = request.data.get('paymentMethod')
    
    
    priceMap = {
        'Daily': 'price_1PJEnzEwLPoE4RaHeBiiO068',
        'Monthly': 'price_1PJEoOEwLPoE4RaH9wRDCtUy',
        'Yearly': 'price_1PJEoeEwLPoE4RaHXVRLrOTN',
    }

    priceId = priceMap[tarification.pricingModel.period]

    print(priceId)

    if(method == "Dhahabia" and token["card"]["brand"] != "UnionPay"):
        return Response({'message': "please enter a valid Dhahabia card (starting with 62..)"}, status=status.HTTP_400_BAD_REQUEST)

    subs = Abonnement.objects.filter(consumer=userId)
    updgrading = None

    if(len(subs)):
        current_date = date.today()
        for sub in subs:
            if sub.end_date < current_date:
                if(sub.pricing.pricingModel.api.id_api != apiId):
                    continue
                if(sub.pricing.priceId == priceId):
                    return Response({"message" : "this user is already subscribed"}, status=status.HTTP_409_CONFLICT)
                    break
                else:
                    sub.statut="upgraded"
                    sub.save()

    

    #Execution
    try:

        #payement method atttachement
        paymentMethod = stripe.PaymentMethod.create(
            type="card",
            card= {
                "token": token['id']
                }
        )
        stripe.PaymentMethod.attach(
            paymentMethod.id,
            customer=customerId
        )


        if(updgrading):
            item = stripe.Subscription.retrieve(updgrading)["items"]["data"][0]["id"]

            stripeSubscription = stripe.Subscription.modify(
                updgrading,
                default_payment_method= paymentMethod.id,
                items=[{"id": item, "price": priceId, "quantity": tarification.price // 5,}],
                billing_cycle_anchor="now",
            )
        else:
            #creating the subscription
            stripeSubscription = stripe.Subscription.create(
                customer=customerId,
                items=[
                    {
                        "price": priceId,  
                        "quantity": tarification.price // 5,
                    }
                ],
                default_payment_method= paymentMethod.id,
                cancel_at_period_end = True,
            )
    
        #retreiving the invoice associated 
        invoice = stripe.Invoice.retrieve(stripeSubscription.latest_invoice)
         
        
        #saving to our database 
        subscription = {
            "id_subscription": stripeSubscription.id +"-"+str(random.randrange(1000)),
            "start_date": datetime.now().strftime('%Y-%m-%d'),
            "end_date": datetime.fromtimestamp(stripeSubscription.current_period_end).strftime('%Y-%m-%d'),
            "consumer": userId,
            "pricing": tarificationId,
            "api": apiId,
            "api_key": "API_WAY_KEY_"+generate_api_key(),
            "quota_remaining" : tarification.quota_limit,
        }


        serializer = AbonnementSerializer(data=subscription)
        if serializer.is_valid():
            serializer.save()
            return Response(subscription, status=status.HTTP_201_CREATED)
        else :
            return Response({'message': str(serializer.errors), 'valid':serializer.is_valid()}, status=status.HTTP_400_BAD_REQUEST)

    except stripe.error.StripeError as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['Get'])
def getsubscription(request):
    userId = request.GET.get('userId')
    apiId = request.GET.get('apiId')

    abonnement = Abonnement.objects.filter(consumer = userId, api = apiId, statut = "active")

    serializer = AbonnementSerializer(abonnement, many= True)
    serialized_data = serializer.data

    return Response(serialized_data, status=status.HTTP_200_OK)