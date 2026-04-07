from django.db import models
from apps.orders.models.cart import Cart
from config.base_model import BaseModel

class CartItem(BaseModel):

    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="items")
    product = models.ForeignKey("products.Product",on_delete=models.CASCADE,related_name="cart_items")
    product_variant = models.ForeignKey("products.ProductVariant",on_delete=models.CASCADE,related_name="cart_items",null=True,blank=True)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        db_table = "cart_items"
        unique_together = ("cart","product","product_variant")


    def __str__(self):
        return f"{self.quantity}* {self.product.name} in cart {self.cart.id}"
    

    @property
    def unit_price(self):
        if self.product_variant:
            return self.product_variant.get_selling_price
        return self.product.selling_price
        
    @property
    def line_total(self):
        return self.unit_price * self.quantity
    
