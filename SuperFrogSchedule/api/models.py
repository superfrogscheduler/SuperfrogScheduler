from django.db import models
from datetime import datetime

#To add: customer foreign key on appearance

class Superfrog(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)
    appearances = models.ManyToManyField("Appearance", through="SuperfrogAppearance")

    def __str__(self):
        return self.first_name + " " + self.last_name

class SuperfrogAppearance(models.Model):
    superfrog = models.ForeignKey(Superfrog, on_delete="NULL")
    appearance = models.ForeignKey("Appearance", on_delete="CASCADE")
    #date_assigned = models.DateTimeField(default=datetime.now())

class Admin(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)

class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)

class Event(models.Model):
    name = models.CharField(max_length=255, blank=True)
    date = models.DateField(blank = True)
    start_time = models.TimeField(blank = True)
    end_time = models.TimeField(blank = True)
    objects = models.Manager()

    def __str__(self):
        return ""+str(self.pk)+": "+self.name+" "+str(self.date)+" "+str(self.start_time)+"-"+str(self.end_time)


class Appearance(Event):
    #event = models.ForeignKey(Event, on_delete = "CASCADE")
    organization = models.CharField(max_length = 255, blank = True)
    location = models.CharField(max_length=255, blank=True)
    parking_info = models.CharField(max_length=255, blank=True)
    org_type = models.CharField(max_length=255, blank = True)
    team_type = models.CharField(max_length=255, blank = True)
    performance_required = models.BooleanField(default=False)
    location_for_belongings = models.CharField(max_length=255, blank=True)
    expenses_and_benefits = models.CharField(max_length=255, blank=True)
    outside_orgs = models.CharField(max_length = 255, blank = True)
    description = models.CharField(max_length = 1000, blank = True)
    status = models.CharField(max_length = 255, default = "Pending")


    def __str__(self):
        return super().__str__()
class AppearanceStatus(models.Model):
    status = models.CharField(max_length=255)

# class OrgType(models.Model):
#     org_type=models.CharField(max_length = 255)

#     def  __str__(self):
#        return ""+str(self.pk)+": "+self.org_type

# class TeamType(models.Model):
#     team_type = models.CharField(max_length = 255)

#     def  __str__(self):
#        return ""+str(self.pk)+": "+self.team_type
    


from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Users must have a password')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

#custom user class
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    #password field is built-in
    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)

    active = models.BooleanField(default=True) # can login
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.

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

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

    @property
    def is_active(self):
        "Is the user active?"
        return self.active