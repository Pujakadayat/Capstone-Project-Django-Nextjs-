from django.db import models

from config.base_model import BaseModel

class Brand(BaseModel):
        name = models.CharField(max_length=100)
        description= models.TextField(blank=True)
        logoimage = models.ImageField(upload_to="brand_images/",blank=True,null=True)
        
        class Meta:
              db_table = "product_brand"
        def __str__(self):
            return self.name
