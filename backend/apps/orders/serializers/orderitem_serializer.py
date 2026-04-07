from apps.orders.models.orderitem import OrderItem
from rest_framework import serializers

class OrderItemReadSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name",read_only=True)
    variant_info = serializers.SerializerMethodField()
    line_profit = serializers.DecimalField(max_digits=10,decimal_places=2,read_only=True)

     
    class Meta:
        model = OrderItem
        fields = ["id","order","product","created_at","product_variant","variant_info","quantity","unit_price","unit_cost","line_total","line_profit"]

        read_only_fields = fields


    def get_variant_info(self,obj):
        if obj.product_variant:
            variations = [f"{v.variation_type.name}:{v.value}"
                           for v in obj.product_variant.variations.all()]
            return {
                "id":str(obj.product_variant.id),
                "sku":obj.product_variant.sku,
                "variations":variations,
            }
        return None
    
class OrderItemWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product","product_variant","quantity"]
