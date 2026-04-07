from django.db import models
from django.conf import settings
from config.base_model import BaseModel

class ProductCategory(BaseModel):
        name = models.CharField(max_length=100)
        slug = models.SlugField(unique=True,max_length=120)
        sort_order = models.IntegerField(default=0)
        parent = models.ForeignKey("self",on_delete=models.SET_NULL,null=True,blank=True,related_name="children")
        
        
        class Meta:
              db_table = "product_category"
              ordering = ["name","sort_order",]
        def __str__(self):
            return self.name
