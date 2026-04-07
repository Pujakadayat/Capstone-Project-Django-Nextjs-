from apps.inventory.models import InventoryStock
from rest_framework import serializers

class InventoryStockReadSerializer(serializers.ModelSerializer):
   product_name = serializers.CharField(source="product.name", read_only=True)
   product_sku = serializers.CharField(source ="product.sku",read_only=True)
   product_variant = serializers.SerializerMethodField()
   

   class Meta:
      model = InventoryStock
      fields = ["id","created_at","updated_at","stock_before","stock_after","product","product_name","product_variant","transaction_type","order","updated_by","created_by","notes","product_sku",]
      read_only_fields = fields


   def get_product_variant(self,obj):
      if obj.product_variant:
         return {
            "id":str(obj.product_variant.id),
            "sku":obj.product_variant.sku,

         }
      return None
   def get_created_by(self,obj):
      if obj.created_by:
         return {
            "id":str(obj.created_by.id),
            "name":obj.created_by.full_name
         }
      return None
   
class InventoryStockWriteSerializer(serializers.ModelSerializer):
   class Meta:
      model = InventoryStock
      fields = ["product","product_variant","quantity","transaction_type","notes"]

   # def validate(self,data):
