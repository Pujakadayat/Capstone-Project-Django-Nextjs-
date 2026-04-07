from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
import uuid
from django.core.validators import RegexValidator

Phone_validator = RegexValidator(regex = r'^\d{10}$',message = "Phone number must be of 10 digits")

class UserManager(BaseUserManager):
    def create_user(self,phone_number,password= None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number  is required")
        user = self.model(phone_number=phone_number,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,phone_number,password=None,**extra_fields):
        extra_fields.setdefault("role","ADMIN")
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("is_superuser",True)
        user = self.create_user(phone_number,password,**extra_fields)

        return user
   