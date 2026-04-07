from apps.orders.models.cartitem import CartItem
from rest_framework import serializers


class CartItemReadSerializers(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name",read_only=True)
    product_image = serializers.ImageField(source="product.image",read_only=True)
    unit_price =serializers.DecimalField(max_digits=10,decimal_places = 2,read_only=True)
    line_total =serializers.DecimalField(max_digits=10,decimal_places = 2,read_only=True)
    variant_info = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id","product","product_name","product_image","created_at","updated_at","product_variant","variant_info","quantity","unit_price","line_total"]
        read_only_fields = ["id","created_at","updated_at","variant_info","unit_price","line_total","product_name","product_image"]

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
    


class CartItemWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ["product","product_variant","quantity"]
   
    def validate(self,attrs):
        product = attrs.get("product")
        variant = attrs.get("product_variant")
        quantity = attrs.get("quantity",1)

        if not product.has_variant and   variant:
            raise serializers.ValidationError({"product_variant":"This product does not have variants"})
        if  product.has_variant and not variant:
            raise serializers.ValidationError({"product_variant":"This product requires a variant to be selected"})
        if  product.has_variant and variant:
            if variant.stock < quantity:
                raise serializers.ValidationError({"quantity":f"Only {variant.stock} stock left"})

        else:
            if product.stock < quantity:
                raise serializers.ValidationError({"quantity":f"Only {product.stock} stock left"})
        return attrs
    
    def create(self,validated_data):
        cart =validated_data.pop("cart")
        product = validated_data["product"]
        variant = validated_data.get("product_variant")
        quantity = validated_data["quantity"]

        existing = CartItem.objects.filter(cart=cart,product=product,product_variant = variant).first()
        if existing:
            existing.quantity += quantity
            existing.save(update_fields=["quantity"])
            return existing
        return CartItem.objects.create(cart=cart,**validated_data)