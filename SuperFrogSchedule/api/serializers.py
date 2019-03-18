from rest_framework import serializers
from .models import User,Superfrog, Admin, Customer, Appearance, Event, SuperfrogAppearance

#Serializer for custom user model
from django.contrib.auth import update_session_auth_hash

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
        fields = ('id','name','date','start_time','end_time','location','status','description','parking_info','cheerleaders', 'showgirls')

class CustomerAppearanceSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    class Meta:
        model = Appearance
        fields = ('id','name','date','start_time','end_time','location','status','description','parking_info','cheerleaders','showgirls','customer')

class SuperfrogAppearanceSerializer(serializers.ModelSerializer):
    # superfrog = SuperfrogSerializer()
    # appearance = AppearanceSerializer()
    class Meta:
        model = SuperfrogAppearance
        fields = ('superfrog','appearance', 'date_assigned')


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'email','first_name', 'last_name',
                    'created_at', 'updated_at',
                    'password','confirm_password',
                    'is_active','is_admin','is_staff',)
        read_only_fields = ('created_at', 'updated_at',)

    """ def create(self, validated_data):
            return User.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.save()

            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if password and confirm_password and password == confirm_password:
                instance.set_password(password)
                instance.save()

            #prevent logging user out after changing password
            #update_session_auth_hash(self.context.get('request'), instance)

            return instance """
