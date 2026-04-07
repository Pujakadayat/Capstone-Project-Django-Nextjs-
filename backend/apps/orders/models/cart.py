import uuid

from django.db import models
from django.conf import settings
from apps.common.choices.status import Status
from config.base_model import BaseModel

class Cart(BaseModel):
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="cart",)
   
    class Meta:
        db_table= "carts"

    def __str__(self):
        return f"{self.user} cart"
    
    @property
    def total(self):
        return sum(item.line_total for item in self.items.all())
    
    @property
    def item_count(self):
        return sum(item.quantity for item in self.items.all())
    

    
