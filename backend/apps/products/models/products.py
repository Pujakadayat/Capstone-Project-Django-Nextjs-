from django.db import models
from django.conf import settings
from config.base_model import BaseModel

class Product(BaseModel):
        name = models.CharField(max_length=350)
        sku = models.CharField(unique=True, max_length=50)
        reorder_point = models.IntegerField(default=5)
        image = models.ImageField(upload_to="product_images/",blank=True,null=True)
        description =models.TextField(blank=True)
        stock = models.IntegerField(default=0)
        has_variant = models.BooleanField(default=False,db_index=True)
        cost_price =models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
        selling_price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
        categories = models.ManyToManyField("products.ProductCategory",related_name="products",blank=True)

        class Meta:
            db_table = "products"
            ordering = ["-created_at"]

        def __str__(self):
            return self.name
        
        @property
        def total_stock(self):
             if self.has_variant:
                return self.variants.filter(is_active=True).aggregate(total=models.Sum("stock"))["total"] or 0
             return self.stock
        @property
        def is_low_stock(self):
             return self.total_stock <= self.reorder_point