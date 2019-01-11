from django.shortcuts import render
from rest_framework import viewsets, views, generics
from .models import Superfrog, Admin, Customer, Event, Appearance, OrgType, TeamType
from .serializers import SuperfrogSerializer, AdminSerializer, CustomerSerializer, EventSerializer, AppearanceSerializer,AppearanceShortSerializer, OrgSerializer, TeamSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action, list_route
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.core.mail import send_mail

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
        queryset = Appearance.objects.filter(status=status)
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()

def appearances(request):
    if request.method == 'GET':
        queryset = Appearance.objects.all()
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method=='POST':
            data = JSONParser().parse(request.body)
            serializer = AppearanceSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse(serializer.data, status = 201)
            return HttpResponse(serializer.errors, status = 400)
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

# function to send confirmation to customer. called after customer is saved in db when requesting event.

def EmailFunc(em):

	recs = Customer.objects.filter(email = em)
	if len(recs) == 0:
		newCustomer = Customer()
		newCustomer.email = em

		send_mail(
		    'Hay',
		    'Here is a confirmation message for the event request.',
		    'superfrog@scheduler.com',
		    [newCustomer.email],
		    fail_silently = False,
		)
		print("email sent")
		return True
	else: 
		return False