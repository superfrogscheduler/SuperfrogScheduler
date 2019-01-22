from django.shortcuts import render
from rest_framework import viewsets, views, generics
from .models import Superfrog, Admin, Customer, Event, Appearance
from .serializers import SuperfrogSerializer, AdminSerializer, CustomerSerializer, EventSerializer, AppearanceSerializer,AppearanceShortSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action, list_route
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail

import json

# class AppearanceViewSet(viewsets.ViewSet):
#     queryset = Appearance.objects.all()
#     serializer_class = AppearanceSerializer

#     def list(self,request, *args, **kwargs ):
#         appearances = Appearance.objects.all()
#         serializer = AppearanceShortSerializer(appearances, many=True)
#         return Response(serializer.data)

#     @list_route(methods=['get'])
#     def list_by_status(self, request, status_id):
#         appearances = queryset.filter(status=status_id)
#         serializer = AppearanceShortSerializer(appearances, many=True)
#         return Response(serializer.data)

#     serializer = AppearanceShortSerializer

def list_by_status(request, status=None):
    if request.method == 'GET':
        print('we did it')
        queryset = Appearance.objects.filter(status=status)
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
@csrf_exempt
def appearances(request):
    if request.method == 'GET':
        queryset = Appearance.objects.all()
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    #save information from form into appearance request
    elif request.method=='POST':
        data = json.loads(request.body)
        print(data)
        appearance_serializer = AppearanceSerializer(data=data['appearance'])
        if appearance_serializer.is_valid():
            appearance = appearance_serializer.save()
            appearance_serializer = AppearanceSerializer(appearance)
            print(appearance_serializer.data)
            appearance.save()
            
        else:
            print(appearance_serializer.errors)
            return HttpResponse(appearance_serializer.errors, status = 400)
                
        customer_serializer = CustomerSerializer(data=data['customer'])
        #after adding customer to db, send confirmation email to customer confirming contact information and event information.
        if customer_serializer.is_valid():
            customer = customer_serializer.save()
            customer.save()
            send_mail('Event request confirmation','Thanks for requesting a Superfrog appearance! Here is a confirmation message for the event request: \n' + '\n' + 'Customer Contact Information \n' + 'Customer Name: ' + customer.first_name + ' ' + customer.last_name + '\n' + 'Phone Number: ' + str(customer.phone) + '\n' + 'Customer email: ' + customer.email + '\n' + ' \n' + 'Appearance Information \n' + 'Organization requesting event: ' + appearance.organization + '\n' + 'Location: ' + appearance.location + '\n' + 'Description: ' + appearance.description + '\n' + 'Status: ' + appearance.status + '\n' + '\n' + 'Our team will review your request within the next two weeks. You will receive an email updating you on our decision when it is made. Thanks and Go Frogs!' ,'superfrog@scheduler.com',[customer.email],fail_silently = False)
        else:
            print(customer_serializer.errors)
            return HttpResponse(appearance_serializer.errors, status = 400)
        appearance_serializer = AppearanceSerializer(appearance)
        return HttpResponse(appearance_serializer.data, status = 201)
    else:
        return HttpResponseBadRequest()

def detail(request, id=None):
    if request.method == 'GET':
        queryset = Appearance.objects.get(pk=id)
        serializer = AppearanceSerializer(queryset, many=False)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()

def create(request):
    if request.method=='POST':
        data = JSONParser().parse(request.body)
        serializer = AppearanceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(serializer.data, status = 201)
        return HttpResponse(serializer.errors, status = 400)
    else:
        return HttpResponseBadRequest()
