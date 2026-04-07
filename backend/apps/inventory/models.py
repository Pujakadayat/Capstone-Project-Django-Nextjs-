from django.db import models
from django.conf import settings
from apps.common.choices.transaction import TransactionType
from config.base_model import BaseModel


class InventoryStock(BaseModel):
    product = models.ForeignKey("products.Product",on_delete=models.CASCADE,related_name="stock_transactions",db_index=True)
    product_variant = models.ForeignKey("products.ProductVariant",on_delete=models.CASCADE,related_name="stock_transactions",null=True,db_index=True,blank=True)
    quantity = models.IntegerField()
    stock_before = models.IntegerField()
    stock_after= models.IntegerField()
    transaction_type = models.CharField(max_length=20,choices=TransactionType.choices,db_index=True)
    order = models.ForeignKey("orders.Order",on_delete=models.SET_NULL,null=True,blank=True,related_name="stock_transactions")
    notes =models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,related_name="created_stock_transactions")

    class Meta:
        db_table="inventory_stock"
        ordering = ["-created_at"]

    def __str__(self) :
        return f"{self.transaction_type}  | {self.product}"


    