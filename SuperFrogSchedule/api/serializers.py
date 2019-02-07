from rest_framework import serializers
from .models import Superfrog, Admin, Customer, Appearance, Event
from django.contrib.auth.models import User

class SuperfrogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Superfrog
        fields = "__all__"

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = "__all__"

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Event
        fields = "__all__"

    def create(self, validated_data):
        return Event(**validated_data)

class AppearanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appearance
        fields = "__all__"

    def create(self, validated_data):
        return Appearance(**validated_data)

class AppearanceShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appearance
        fields = ('id','name','date','start_time','end_time','location','status')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password') 
        extra_kwargs = {'pass': {'write_only': True, 'required': True}}
    
    #validated data harsh password in http response to database
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) 
        return user