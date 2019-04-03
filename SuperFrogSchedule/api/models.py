import uuid
from django.db import models
import datetime
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, password):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Users must have a password')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name
        )

        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_staffuser(self, email, first_name, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            first_name,
            password=password,
        )
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            first_name,
            password=password,
        )
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user

#custom user class
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    #might not need username
    #username = models.CharField(max_length=40, unique=True)

    #password field is built-in
    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)

    is_active = models.BooleanField(default=True) # can login
    is_staff = models.BooleanField(default=False) # a admin user; non super-user
    is_admin = models.BooleanField(default=False) # a superuser

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name'] # Email & Password are required by default. 'username'

    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        # The user is identified by their email address
        return self.first_name

    def __str__(self):              # __unicode__ on Python 2
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True


#To add: customer foreign key on appearance

class Superfrog(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True,)
    phone = models.IntegerField(default=0)
    #list of appearances id
    appearances = models.ManyToManyField("Appearance", through="SuperfrogAppearance")
    street = models.CharField(max_length=100, blank = True)
    city = models.CharField(max_length=100, blank= True)
    state = models.CharField(max_length= 100, blank = True)
    zipCode = models.CharField(max_length=100, blank = True)

    def __str__(self):
        return self.user.__str__()

class SuperfrogAppearance(models.Model):
    superfrog = models.ForeignKey(Superfrog, on_delete=models.SET_NULL, null = True)
    appearance = models.ForeignKey("Appearance", on_delete=models.CASCADE, null = True)
    date_assigned = models.DateTimeField(default=datetime.datetime.today)


class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True,)
    phone = models.IntegerField(default=0)

    def __str__(self):
        return self.user.__str__()


class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=200 )
    phone = models.CharField(max_length=30)


class Event(models.Model):
    name = models.CharField(max_length=255, blank=True)
    date = models.DateField( default = datetime.date.today, blank = True)
    start_time = models.TimeField(blank = True)
    end_time = models.TimeField(blank = True)
    objects = models.Manager()

    def __str__(self):
        return ""+str(self.pk)+": "+self.name+" "+str(self.date)+" "+str(self.start_time)+"-"+str(self.end_time)


class Appearance(Event):
    #event = models.ForeignKey(Event, on_delete = "CASCADE")
    event_key = models.UUIDField(default=uuid.uuid4, editable=False)
    organization = models.CharField(max_length = 255, blank = True)
    location = models.CharField(max_length=255, blank=True)
    parking_info = models.CharField(max_length=255, blank=True)
    org_type = models.CharField(max_length=255, blank = True)
    cheerleaders = models.CharField(max_length=255, default = "None")
    showgirls = models.CharField(max_length=255, default = "None")
    performance_required = models.BooleanField(default=False)
    special_instructions = models.CharField(max_length=255, blank=True)
    expenses_and_benefits = models.CharField(max_length=255, blank=True)
    outside_orgs = models.CharField(max_length = 255, blank = True)
    description = models.CharField(max_length = 1000, blank = True)
    status = models.CharField(max_length = 255, default = "Pending")
    customer = models.ForeignKey(Customer, on_delete = models.SET_NULL, null=True, blank=True)
    mileage = models.IntegerField(default = 0)
    cost = models.DecimalField(default = 0.00, decimal_places=2, max_digits=10)
    receipt_number = models.CharField(max_length = 255, blank = True, null=True)
    compensation_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return super().__str__()

class SuperfrogClass(models.Model):
    superfrog = models.ForeignKey(Superfrog, on_delete=models.CASCADE)
    name = models.CharField(max_length= 255)
    day = models.IntegerField()
    start = models.TimeField()
    end = models.TimeField()

    def __str__(self):
        return ""+str(self.superfrog) +":" + str(self.day) + " " + str(self.start)+"-"+str(self.end)

# class OrgType(models.Model):
#     org_type=models.CharField(max_length = 255)

#     def  __str__(self):
#        return ""+str(self.pk)+": "+self.org_type

# class TeamType(models.Model):
#     team_type = models.CharField(max_length = 255)

#     def  __str__(self):
#        return ""+str(self.pk)+": "+self.team_type
    


