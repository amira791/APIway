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
from django.utils.text import slugify
import re








ELASTIC_HOST = 'http://localhost:9200/'

# Create the client instance
client = Elasticsearch(
    [ELASTIC_HOST],
    basic_auth=('hadilane', '123456789')
)



# Indexing data in case of update
@api_view(['POST'])
def index_api(request):
    api_data = request.data  # Get API data from request

    # Serialize API data
    serializer = APISerializer(data=api_data)
    if serializer.is_valid():
        api_instance = serializer.save()

        # Index data in Elasticsearch
        doc = APIDocument(
            meta={'id': api_instance.id},
            api_name=api_instance.api_name,
            description=api_instance.description,
            category=api_instance.category.label,
            functionalities=api_instance.functionalities,
            
        )
        doc.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






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

    # Build query for each processed word
    queries = []
    for processed_word in processed_query_words:
        query_string = "*" + processed_word + "*"  # Add wildcard characters to the processed word
        reversed_query_string = "*" + processed_word[::-1] + "*"  # Add wildcard characters to the reversed processed word

        query = Q('bool',
                  should=[
                      Q('query_string', query=query_string, fields=search_fields),
                      Q('query_string', query=reversed_query_string, fields=search_fields)
                  ],
                  minimum_should_match=1)
        queries.append(query)

    # Combine queries with a boolean OR
    combined_query = Q('bool', should=queries)

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
