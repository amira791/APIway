from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
import requests
from django.utils import timezone 
""" from rest_framework.response import Response
from .models import APIendpoint
import requests """
from rest_framework.response import Response
import time

@api_view(['POST'])
def execute_api(request, website, endpoint):
    try:
        headers = request.data.get('headers', {}) #still not done
      
        api_key = headers.get('x-api-key')

        print(api_key)
        if not api_key:
            return Response({'error': 'API key is missing.'}, status=400)
        
        try:
            subscription = Abonnement.objects.get(api_key=api_key)
        except Abonnement.DoesNotExist:
            return Response({'error': 'Invalid API key'}, status=403)

        if subscription.end_date < timezone.now().date():
            return Response({'error': 'API key has expired'}, status=403)

        if subscription.quota_remaining <= 0:
            return Response({'error': 'Quota exceeded'}, status=403)

        print(request.data)
        params = request.data.get('params', {})
        body = request.data.get('body', None)
        path_params = request.data.get('path_params', {})
        method = request.data.get('method')
        selectedEndpointId =  request.data.get('selectedEndpoint')
        # Replace {} in the endpoint with the actual value
        formatted_endpoint = endpoint.format(**path_params)

        # Construct the full URL with formatted endpoint
        full_url = f"{website}/{formatted_endpoint}"
        try:
            selectedEndpoint = APIendpoint.objects.get(id_endpoint=selectedEndpointId)
        except APIendpoint.DoesNotExist:
            return Response({'error': 'Invalid endpoint.'}, status=404)

        print(full_url)
        start_time = time.time()
        response = requests.request(method=method,
                                    url=full_url,
                                    headers=headers,
                                    params=params,
                                    json=body if body else None)
        response_time = time.time() - start_time
         # Filter the headers to include only the desired ones
        desired_headers = [
            'Date',
            'Content-Type',
            'Transfer-Encoding',
            'Connection',
            'Vary',
            'Access-Control-Allow-Credentials',
            'Cache-Control',
            'Pragma'
        ]
        filtered_headers = {key: value for key, value in response.headers.items() if key in desired_headers}

        # Add custom headers
        filtered_headers['Expires'] = subscription.end_date.strftime('%a, %d %b %Y %H:%M:%S GMT')
        filtered_headers['Response-Time'] = response_time
        filtered_headers['X-Quota-Limit'] = str(subscription.pricing.quota_limit)
        filtered_headers['X-Quota-Remaining'] = str(subscription.quota_remaining)


        # Handle response
        result = {
            'status_code': response.status_code,
             'headers': filtered_headers,
            'body': response.json() if response.headers.get('content-type') == 'application/json' else response.text
        }
        APIUsage.objects.create(
            subscription=subscription,
            status_code=response.status_code,
            response_time=response_time,
            endpoint=selectedEndpoint
        )

        # Update the quota
        subscription.quota_remaining -= 1
        subscription.save()

      #condition for when there is an error in the returned value
        return Response({'result': result})
    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=400)
    except Abonnement.DoesNotExist:
        return Response({'result':{
           
            'body': "You need to resubscribe in  order to execute"
        },'error': 'Invalid API key.'}, status=403)

# Fournisseur View
class FournisseurView(viewsets.ModelViewSet):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer

# Admin View
class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

# Consommateur View
class ConsommateurView(viewsets.ModelViewSet):
    queryset = Consommateur.objects.all()
    serializer_class = ConsommateurSerializer

# APIcategory View
class APIcategoryView(viewsets.ModelViewSet):
    queryset = APIcategory.objects.all()
    serializer_class = APIcategorySerializer

# API View
class APIView(viewsets.ModelViewSet):
    queryset = API.objects.all()
    serializer_class = APISerializer

# APIversion View
class APIversionView(viewsets.ModelViewSet):
    queryset = APIversion.objects.all()
    serializer_class = APIversionSerializer

# APIendpoint View
class APIendpointView(viewsets.ModelViewSet):
    queryset = APIendpoint.objects.all()
    serializer_class = APIendpointSerializer

# Functionnality View
class FunctionnalityView(viewsets.ModelViewSet):
    queryset = Functionnality.objects.all()
    serializer_class = FunctionnalitySerializer

# APIdocumentation View
class APIdocumentationView(viewsets.ModelViewSet):
    queryset = APIdocumentation.objects.all()
    serializer_class = APIdocumentationSerializer

# Tarification View
class TarificationView(viewsets.ModelViewSet):
    queryset = Tarification.objects.all()
    serializer_class = TarificationSerializer

# Abonnement View
class AbonnementView(viewsets.ModelViewSet):
    queryset = Abonnement.objects.all()
    serializer_class = AbonnementSerializer
    
# Endpoint_parameter View
class Endpoint_parameterView(viewsets.ModelViewSet):
    queryset = Endpoint_parameter.objects.all()
    serializer_class = Endpoint_parameterSerializer

# Type View
class TypeView(viewsets.ModelViewSet):
    queryset = TypeParam.objects.all()
    serializer_class = TypeParamSerializer
    
# Type View
class ApiHeaderView(viewsets.ModelViewSet):
    queryset = ApiHeader.objects.all()
    serializer_class = ApiHeaderSerializer
    
# ApiQueryParam View
class ApiQueryParamView(viewsets.ModelViewSet):
    queryset = ApiQueryParam.objects.all()
    serializer_class = ApiQueryParamSerializer
    
# ApiEndpointBody View
class ApiEndpointBodyView(viewsets.ModelViewSet):
    queryset = ApiEndpointBody.objects.all()
    serializer_class = ApiEndpointBodySerializer

# TypeTarif View
class TypeTarifView(viewsets.ModelViewSet):
    queryset = TypeTarif.objects.all()
    serializer_class = TypeTarifSerializer
    
# PricingModel View
class PricingModelView(viewsets.ModelViewSet):
    queryset = PricingModel.objects.all()
    serializer_class = PricingModelSerializer

# ResponseExample View
class ResponseExampleView(viewsets.ModelViewSet):
    queryset = ResponseExample.objects.all()
    serializer_class = ResponseExampleSerializer

# API usage View
class APIUsageView(viewsets.ModelViewSet):
    queryset = APIUsage.objects.all()
    serializer_class = APIUsageSerializer


""" class ExecuteAPI(APIView):
permission_classes = [IsAuthenticated]

def post(self, request): 
        api_id = request.data.get('apiId')
        endpoint_id = request.data.get('endpointId')
        params = request.data.get('params', {})
        try:
            api = API.objects.get(id_api=api_id)
            endpoint = APIendpoint.objects.get(id_endpoint=endpoint_id)
            headers = {header.key: header.example_value for header in endpoint.headers.all()}
            query_params = {param.key: param.example_value for param in endpoint.query_params.all()}
            body_params = {body.payload_name: body.body_example for body in endpoint.body.all()}

            response = requests.request(
                method=endpoint.method,
                url=api.website + endpoint.path,
                headers=headers,
                params=query_params,
                json=body_params if endpoint.method in ['POST', 'PUT', 'PATCH'] else None
            )
            return Response(response.json(), status=response.status_code)
        except (API.DoesNotExist, APIendpoint.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except requests.RequestException as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)"""