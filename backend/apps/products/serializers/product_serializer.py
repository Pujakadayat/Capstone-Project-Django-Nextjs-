# from apps.products.models import Product
# from rest_framework import serializers

# class ProductSerializer(serializers.Serializer):
#     id = serializers.UUIDField(read_only = True)
#     name = serializers.CharField(max_length=350)
#     reorder_point = serializers.IntegerField()
#     image = serializers.ImageField(required=False)
#     description = serializers.CharField(required = False, allow_null=True,allow_blank = True)
#     created_at = serializers.DateTimeField(read_only=True)
#     updated_at = serializers.DateTimeField(read_only=True)
#     sku = serializers.CharField(read_only=True)
#     cost_price = serializers.DecimalField(max_digits=20,decimal_places =2)
#     selling_price = serializers.DecimalField(max_digits = 20,decimal_places=2)
#     has_variant = serializers.BooleanField(default=False)
#     stock = serializers.IntegerField(default=0)


#     def create(self,validated_data):
#         return Product.objects.create(**validated_data)
    

#     def update(self,instance,validated_data):
#         instance.name = validated_data.get("name",instance.name)
#         instance.reorder_point = validated_data.get("reorder_point",instance.reorder_point)
#         instance.image = validated_data.get("image",instance.image)
#         instance.description = validated_data.get("description",instance.description)
#         instance.save()
#         return instance
    
# class ProductListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ["id","name","description","created_at","image","selling_price","cost_price"]
#         read_only_fields = ["id","created_at"]


    
from rest_framework import serializers
from apps.products.models.products import Product
from apps.products.models.category import ProductCategory


class ProductSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        many=True, queryset=ProductCategory.objects.all(), required=False
    )
    total_stock = serializers.ReadOnlyField()
    is_low_stock = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            "id", "name", "sku", "description", "image",
            "cost_price", "selling_price", "reorder_point",
            "stock", "has_variant", "categories",
            "total_stock", "is_low_stock",
            "is_active", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "total_stock", "is_low_stock",]
    def validate(self,data):
        is_variant = data.get("has_variant",False)
        if not is_variant:
            if not data.get("selling_price"):
                raise serializers.ValidationError({"selling_price":"Required for product without variant"})
            if not data.get("cost_price"):
                raise serializers.ValidationError({"cost_price":"Required for product without variant"})
        return data
class ProductListSerializer(serializers.ModelSerializer):
    total_stock = serializers.ReadOnlyField()
    is_low_stock = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            "id", "name", "description", "image",
            "selling_price", "total_stock", "is_low_stock",
            "has_variant", "created_at",
        ]