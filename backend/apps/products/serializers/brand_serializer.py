from apps.products.models.brand import Brand
from rest_framework import serializers

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["name","id","created_at","is_active","description","logoimage",]
        read_only_fields = ["id","created_at","is_active"]