import uuid

from django.db import models
from django.conf import settings
from apps.common.choices.status import Status
from config.base_model import BaseModel

class Order(BaseModel):
    order_number = models.UUIDField(default=uuid.uuid4,unique=True,blank=False,editable=False,db_index=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="orders",db_index=True)
    processed_by = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True,related_name="processed_orders",)
    subtotal = models.DecimalField(max_digits=10,decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    tax_amount = models.DecimalField(default=0,max_digits=10,decimal_places=2)
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)
    shipping_address = models.TextField()
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True
    )

    class Meta:
        db_table= "orders"
        ordering = ["-created_at"]


    def __str__(self):
        return f"{self.user} order number is {self.order_number}"
    
    @property
    def total_profit(self):
        return sum(item.line_profit for item in self.items.all())
    
