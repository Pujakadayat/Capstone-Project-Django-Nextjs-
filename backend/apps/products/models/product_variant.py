from django.db import models
from django.conf import settings
from config.base_model import BaseModel

class VariationType(BaseModel):
    name=models.CharField(max_length=100)

    def __str__(self):
        return self.name

class VariationValue(BaseModel):
    variation_type = models.ForeignKey(VariationType,on_delete=models.CASCADE,related_name="values")
    value = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.variation_type.name}:{self.value}"

class ProductVariant(BaseModel):
    product = models.ForeignKey("products.Product",
            on_delete=models.CASCADE,
            related_name="variants",
            db_index=True,)
    sku = models.CharField(unique=True, max_length=50)
    variations = models.ManyToManyField(VariationValue)
    cost_price =models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    selling_price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    stock = models.IntegerField(default=0)
    
    class Meta:
        db_table = "product_variants"


    def __str__(self):
        values = [v.value for v in self.variations.all()]
        return f"{self.product.name}-{','.join(values)}"
    
    @property
    def get_cost_price(self):
        return self.cost_price if self.cost_price is not None else self.product.cost_price
    
    @property
    def get_selling_price(self):
        return self.selling_price if self.selling_price is not None else self.product.selling_price

