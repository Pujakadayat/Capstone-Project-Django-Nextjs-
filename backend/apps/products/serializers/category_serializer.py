from apps.products.models.category import ProductCategory
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductCategory
        fields = ["id","name","created_at","updated_at","slug","sort_order","parent","image",]
        read_only_fields = ["id","created_at","updated_at","slug"]
        extra_kwargs = {"parent":{"required":False,"allow_null":True}}
        def validate_slug(self, value):
            qs = ProductCategory.objects.filter(slug=value)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError("Slug already exists.")
            return value
        
class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["id","name","sort_order","parent","created_at","image",]
        read_only_fields=["id","parent","created_at"]
