from django.shortcuts import render
from rest_framework import viewsets, views, generics, status
from .models import Superfrog, Admin, Customer, Event, Appearance
from .serializers import SuperfrogSerializer, AdminSerializer, CustomerSerializer, EventSerializer, AppearanceSerializer,AppearanceShortSerializer, UserSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action, list_route
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt

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
        if customer_serializer.is_valid():
            customer = customer_serializer.save()
            customer.save()
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

import json

#Function needs for login user
from django.contrib.auth import authenticate, login

#Login View
class LoginView(views.APIView):
    #override post function
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        #authenticate user
        user = authenticate(email=email, password=password)

        #authenticate() looks for an user in database using email and then verify if the password matches
        if user is not None:
            if user.is_active:
                #login() create a new session for this user
                login(request, user)
                serializer = UserSerializer(user, context={'request': request})
                #return the user information using the serializer in form of a JSON object
                return Response(serializer.data,status=status.HTTP_200_OK)
            else: #inactive user account
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This user has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else: #no matched user 
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)