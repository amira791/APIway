from django.conf import settings

from django.shortcuts import render

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status


from api_mapi.models import Abonnement,Tarification
from api_mapi.serializers import AbonnementSerializer

from datetime import datetime
import string, random


from datetime import datetime, date

import stripe
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