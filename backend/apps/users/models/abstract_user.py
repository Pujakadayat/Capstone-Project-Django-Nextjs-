from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

from django.core.validators import RegexValidator

from apps.users.choice import Role
from config.base_model import BaseModel

from .base_user import UserManager

Phone_validator = RegexValidator(regex = r'^\d{10}$',message = "Phone number must be of 10 digits")
class User(AbstractBaseUser,PermissionsMixin,BaseModel):

    full_name= models.CharField(max_length=100,null=True)
    email=models.EmailField(max_length=150,unique=True,null=True)
    image = models.ImageField(upload_to='users/images/',blank=True,null=True)
    phone_number=models.CharField(validators=[Phone_validator],max_length=10,unique=True,db_index=True)
    role= models.CharField(max_length=20,choices=Role.choices,default= Role.CUSTOMER,db_index=True)
    is_staff= models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS=["email"]

    class Meta:
        db_table="users"
        ordering=["-created_at"]
    def __str__(self):
        return f"{self.phone_number} ({self.role})"
    
    @property
    def is_admin(self):
        return self.role == Role.ADMIN
    
    @property
    def is_staff_role(self):
        return self.role== Role.STAFF
    
    @property
    def is_customer(self):
        return self.role == Role.CUSTOMER
    
    @property

    def is_admin_or_is_staff(self):
        return self.role in [Role.ADMIN,Role.STAFF]


