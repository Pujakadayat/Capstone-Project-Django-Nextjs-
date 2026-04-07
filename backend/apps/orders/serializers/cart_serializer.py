from apps.orders.models.cart import Cart
from .cartitem_serializer import CartItemReadSerializers
from rest_framework import serializers

class CartSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.full_name",read_only=True)
    items=CartItemReadSerializers(many=True,read_only=True)
    item_count = serializers.IntegerField(read_only=True)
    total = serializers.DecimalField(max_digits=10,decimal_places=2,read_only=True)
    class Meta:
        model = Cart
        fields = ["id","user_name","created_at","updated_at","total","item_count","items",]
        read_only_fields = fields