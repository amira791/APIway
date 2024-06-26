from rest_framework import generics , status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api_mapi.models import *
from api_mapi.serializers import *
from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse
from rest_framework import viewsets
from django.db.models import Min, Max
from django.db.models import OuterRef, Subquery
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import get_user_model
from elasticsearch_dsl import Index
from .document import APIDocument
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Q, Index



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

# Search function 
@api_view(['POST'])
def search_api(request, index='api_index'):
    query = request.data.get('query', '')
    search_field = request.data.get('filter')
    category_label = request.data.get('category')

    # Define Elasticsearch multi_match query
    if search_field == 'Name':
        search_fields = ["api_name^3"]
    elif search_field == 'Description':
        search_fields = ["description^3"]
    elif search_field == 'Category':
        search_fields = ["category.label^3"]
    elif search_field == 'Functionalities':
        search_fields = ["functions.functName^3"]
    else:
        return Response({'error': 'Invalid search field'}, status=status.HTTP_400_BAD_REQUEST)

    # Define Elasticsearch multi_match query
    search_query = {
        "multi_match": {
            "query": query,
            "fields": search_fields,
            "fuzziness":'AUTO'
       
        }
        
    }

    # Define wildcard queries for partial word matches
    wildcard_queries = []
    for field in search_fields:
        wildcard_queries.append({
            "wildcard": {
                field: {
                    "value": f"*{query.lower()}*"
                }
            }
        })

    # Combine multi_match and wildcard queries using Bool Query
    combined_query = {
        "bool": {
            "should": [search_query] + wildcard_queries,
            "minimum_should_match": 1
        }
    }


    sort = '_score'  # Tri par défaut (pertinence)

    # Execute search query
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