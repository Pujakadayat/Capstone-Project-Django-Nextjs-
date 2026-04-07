from apps.orders.models.order import Order
from apps.orders.serializers.orderitem_serializer import OrderItemWriteSerializer, OrderItemReadSerializer
from apps.common.choices.transaction import TransactionType
from apps.orders.models.orderitem import OrderItem
from apps.inventory.models import InventoryStock
from rest_framework import serializers
from django.db import transaction

class OrderReadSerializer(serializers.ModelSerializer):
    items = OrderItemReadSerializer(many=True,read_only=True)
    customer_name = serializers.CharField(source="user.full_name",read_only=True)
    total_profit = serializers.DecimalField(max_digits = 10,decimal_places=2,read_only=True)
    class Meta:
        model = Order
        fields = ["id","created_at","updated_at","order_number","customer_name","processed_by","subtotal","discount_amount","tax_amount","total_amount","shipping_address","notes","status","items","total_profit"]
        read_only_fields = fields
     
class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemWriteSerializer(many=True)

    class Meta:
        model = Order
        fields = ["shipping_address","notes","items"]

    def validate_items(self,value):
        if not value:
            raise serializers.ValidationError("Order must contain at least one item")
        for item in value:
            product=item["product"]
            variant = item["product_variant"]
            qty = item["quantity"]
            available = variant.stock if variant else product.stock
            name = f"{product.name}"  + (f"{variant.sku}" if variant else "")
            if available < qty:
                raise serializers.ValidationError(f"Only {available} units available  for {name}")
        return value
    
    @transaction.atomic
    def create(self,validated_data):
        items_data = validated_data.pop("items")
        user = self.context["request"].user
        tax_amount = validated_data.get("tax_amount")
        discount_amount = validated_data.get("discount_amount")
        subtotal = 0
        if tax_amount:
            subtotal +=tax_amount
        if discount_amount:
            subtotal+=tax_amount
        for item in items_data:
            if item.get("product_variant"):
                price = item["product_variant"].get_selling_price
            else:
                price =item["product"].selling_price
        subtotal += price *item["quantity"] 
        order = Order.objects.create(user=user,subtotal=subtotal,total_amount = subtotal,**validated_data)

        for item in items_data:
            product = item["product"]
            variant = item["product_variant"]
            qty = item["quantity"]
            price = variant.get_selling_price if variant else product.selling_price
            cost = variant.get_cost_price if variant else product.cost_price

            OrderItem.objects.create(order=order,product=product,
                                     product_variant = variant,quantity=qty,
                                     unit_price=price,unit_cost=cost,
                                     line_total=price* qty)
            if variant:
                stock_before = variant.stock
                variant.stock -= qty
                variant.save(update_fields = ["stock"])
            else:
                stock_before= product.stock
                product.stock = -qty
                product.save(update_fields = ["stock"])
                InventoryStock.objects.create(
                    product=product,
                    product_variant=variant,
                    quantity=qty,
                    stock_before=stock_before,
                    stock_after = variant.stock if variant else product.stock,
                    transaction_type = TransactionType.SALE,
                    order = order,
                    created_by=user
                )
        return order

    
     
class OrderStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["notes","status"]
