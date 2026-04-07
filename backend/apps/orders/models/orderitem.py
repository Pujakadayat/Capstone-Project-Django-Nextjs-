from django.db import models
from apps.orders.models.order import Order
from config.base_model import BaseModel

class OrderItem(BaseModel):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="items",)
    product = models.ForeignKey("products.Product",on_delete=models.CASCADE,related_name="order_items")
    product_variant = models.ForeignKey("products.ProductVariant",on_delete=models.CASCADE,related_name="order_items",null=True,blank=True)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10,decimal_places=2)
    unit_cost = models.DecimalField(max_digits=10,decimal_places=2)
    line_total = models.DecimalField(max_digits=10,decimal_places=2)

    class Meta:
        db_table = "order_items"

    def __str__(self):
        return f"{self.quantity} * {self.product.name} Order{self.order.order_number}"

    @property
    def line_profit(self):
        return (self.unit_price -self.unit_cost) * self.quantity