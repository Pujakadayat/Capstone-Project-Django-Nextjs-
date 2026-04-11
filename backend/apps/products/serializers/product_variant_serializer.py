# from apps.products.models import ProductVariant
# from apps.products.models.product_variant import VariationType, VariationValue
# from rest_framework import serializers

# class VariationTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = VariationType
#         fields = ["id","name"]
# class VariationValueSerializer(serializers.ModelSerializer):
#     variation_type = VariationTypeSerializer(read_only=True)
#     variation_type_id = serializers.PrimaryKeyRelatedField(
#         queryset=VariationType.objects.all(), source="variation_type", write_only=True
#     )

# class  ProductVariantSerializer(serializers.Serializer):
#     id = serializers.UUIDField(read_only=True)
#     sku = serializers.CharField(read_only=True)
#     variations =VariationValueSerializer(many=True,read_only=True)
#     variation_value = serializers.CharField(max_length = 150)
#     cost_price = serializers.DecimalField(max_digits=20,decimal_places =2)
#     selling_price = serializers.DecimalField(max_digits = 20,decimal_places=2)
#     stock = serializers.IntegerField(default=0)
#     created_at = serializers.DateTimeField(read_only=True)
#     updated_at = serializers.DateTimeField(read_only=True)
#     product = serializers.SerializerMethodField()

#     def get_product(self,obj):
#         if obj.product:
#             return {
#                 "id":str(obj.product.id),
#                 "name":obj.product.name
#             }
#         return None

#     def create(self,validated_data):
#         return ProductVariant.objects.create(**validated_data)
    
#     def update(self,instance,validated_data):
#         instance.variation_value = validated_data.get("variation_value",instance.variation_value)
#         instance.cost_price = validated_data.get("cost_price",instance.cost_price)
#         instance.selling_price = validated_data.get("selling_price",instance.selling_price)
#         instance.stock =validated_data.get("stock",instance.stock)
#         instance.save()
#         return instance


#     class Meta:
#         model = VariationValue
#         fields = ["id","value","variation_type","variation_type_id"]

# class ProductVariantListSerializer(serializers.ModelSerializer):
#     class  Meta:
#         model = ProductVariant
#         fields = ["id","sku","variations","cost_price","selling_price","stock",]
#         read_only_fields =["id","sku"]

from rest_framework import serializers
from apps.products.models.product_variant import ProductVariant, VariationValue, VariationType


class VariationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariationType
        fields = ["id", "name"]


class VariationValueSerializer(serializers.ModelSerializer):  # FIXED — PascalCase
    variation_type = VariationTypeSerializer(read_only=True)
    variation_type_id = serializers.PrimaryKeyRelatedField(
        queryset=VariationType.objects.all(), source="variation_type", write_only=True
    )

    class Meta:
        model = VariationValue
        fields = ["id", "value", "variation_type", "variation_type_id"]


class ProductVariantSerializer(serializers.ModelSerializer):
    variations = VariationValueSerializer(many=True, read_only=True)
    variation_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=VariationValue.objects.all(),
        source="variations", write_only=True
    )
    get_cost_price = serializers.ReadOnlyField()
    get_selling_price = serializers.ReadOnlyField()
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = ProductVariant
        fields = [
            "id", "sku", "product", "product_name",
            "variations", "variation_ids",
            "cost_price", "selling_price",
            "get_cost_price", "get_selling_price",
            "stock", "is_active", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at","sku"]

    def create(self, validated_data):
        variations = validated_data.pop("variations", [])  # FIXED — M2M must use .set()
        variant = ProductVariant.objects.create(**validated_data)
        variant.variations.set(variations)
        return variant

    def update(self, instance, validated_data):
        variations = validated_data.pop("variations", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if variations is not None:
            instance.variations.set(variations)
        return instance


class ProductVariantListSerializer(serializers.ModelSerializer):
    get_selling_price = serializers.ReadOnlyField()

    class Meta:
        model = ProductVariant
        fields = ["id", "sku", "variations", "get_selling_price", "stock", "is_active"]