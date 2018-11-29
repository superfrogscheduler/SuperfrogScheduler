from rest_framework import serializers
from .models import Superfrog, Admin, Customer, Appearance, Event, OrgType, TeamType

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

class AppearanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appearance
        fields = "__all__"

class AppearanceShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appearance
        fields = ('id','name','date','start_time','location','status')
class OrgSerializer(serializers.ModelSerializer):
    class Meta: 
        model = OrgType
        fields = "__all__"

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamType
        fields = "__all__"