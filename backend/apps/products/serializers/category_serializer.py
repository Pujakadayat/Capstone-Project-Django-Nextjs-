from apps.products.models.category import ProductCategory
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductCategory
        fields = ["id","name","created_at","updated_at","slug","sort_order","parent"]
        read_only_fields = ["id","created_at","updated_at","slug"]
        
class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["id","name","sort_order","parent","created_at"]
        read_only_fields=["id","parent","created_at"]
