from django.shortcuts import render
from rest_framework import viewsets, views, generics
from .models import Superfrog, Admin, Customer, Event, Appearance, Superfrog, SuperfrogAppearance
from .serializers import SuperfrogSerializer, AdminSerializer, CustomerSerializer, EventSerializer, AppearanceSerializer,AppearanceShortSerializer,CustomerAppearanceSerializer, SuperfrogAppearanceSerializer
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
from django.core.mail import send_mail
from datetimerange import DateTimeRange
from collections import defaultdict, OrderedDict
from django.contrib.auth import authenticate, login,logout
from rest_framework import permissions


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

#def addEmployee(request):
#    if request.method == 'POST:
#        user = User.objects.create_user('') 

def getSuperfrog(request, id = None):
    if request.method == 'GET':
        queryset = Superfrog.objects.get(user = id)
        serializer = SuperfrogSerializer(queryset, many= False)
        return HttpResponse(JSONRenderer().render(serializer.data))

def getAdmin(request, id = None):
    if request.method == 'GET':
        queryset = Admin.objects.get(user = id)
        serializer = AdminSerializer(queryset, many= False)
        return HttpResponse(JSONRenderer().render(serializer.data))

@csrf_exempt
def appearances(request):
    print('hi')
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
        return HttpResponse(status = 200)
    else:
        return HttpResponseBadRequest()

def detail(request, id=None):
    if request.method == 'GET':
        queryset = Appearance.objects.get(pk=id)
        serializer = CustomerAppearanceSerializer(queryset, many=False)
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
        
@csrf_exempt
def signUp(request, id=None, sId = None):
    if request.method=='PATCH':
        appearance_id = Appearance.objects.get(pk=id)
        superfrog_id = Superfrog.objects.get(user_id = sId)
        superfrog_appearance = SuperfrogAppearance(superfrog=superfrog_id, appearance=appearance_id)
        superfrog_appearance.save()
        appearance_id.status = "Assigned"
        appearance_id.save()
        return HttpResponse(superfrog_appearance, status= 201)

@csrf_exempt
def acceptAppearance(request, id=None):
    if request.method=='PATCH':
        appearance_id = Appearance.objects.get(pk=id)
        appearance_id.status = "Accepted"
        appearance_id.save()
        return HttpResponse( status=201)

@csrf_exempt
def rejectAppearance(request, id = None):
    if request.method=='DELETE':
        appearance_id = Appearance.objects.get(pk=id)
        appearance_id.delete()
        return HttpResponse(status = 201)
def events(request):
    if request.method == 'GET':
        queryset = Event.objects.all()
        serializer = EventSerializer(queryset, many=True)
        print(serializer.data)
        print(type(serializer.data))
        return HttpResponse(JSONRenderer().render(serializer.data))    

def toDateRange(date, start, end):
    startstr = str(date)+"T"+str(start)
    endstr = str(date)+"T"+str(end)
    return DateTimeRange(startstr,endstr)

def events_customer_monthly(request, year, month):
    events = defaultdict(list)
    queryset = Event.objects.filter(date__year = year, date__month = month).order_by('date', 'start_time', 'end_time')
    for event in queryset:
        dtr = toDateRange(event.date, event.start_time, event.end_time)
        if not events[event.date]:
            events[event.date].append(dtr)
        else:
            inserted = False
            for i in range(len(events[event.date])):
                e =  events[event.date][i]
                if e.is_intersection(dtr):
                    events[event.date][i] = e.encompass(dtr)
                    inserted = True
                    break
            if not inserted:
                events[event.date].append(dtr)
    response = []
    for day in events:
        for event in events[day]:
            event.start_time_format = '%H:%M:%S'
            event.end_time_format = '%H:%M:%S'
            response.append(OrderedDict([('start', str(day) + " "+ event.get_start_time_str()), ('end',  str(day) + " "+ event.get_end_time_str()), ('editable', False)]))
    return HttpResponse(JSONRenderer().render(response))


def list_by_status_list(request, status=None):
    if request.method == 'GET':
        queryset = Appearance.objects.filter(status=status)
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()



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


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)