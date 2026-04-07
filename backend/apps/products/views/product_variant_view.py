from apps.users.permissions import  IsAdminUser
from apps.products.models.product_variant import ProductVariant
from apps.products.serializers.product_variant_serializer import ProductVariantListSerializer, ProductVariantSerializer
from config.pagination import CustomPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework import generics



class ProductVariantCreateListView(generics.ListCreateAPIView):
    pagination_class = CustomPagination

    def  get_queryset(self):
        return  ProductVariant.objects.filter(is_active=True).prefetch_related("variations__varitaion_type").select_related("product")

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return [AllowAny()]
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return ProductVariantSerializer
        return  ProductVariantListSerializer
    
    
class ProductVariantRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductVariantSerializer

    def get_queryset(self):
        return ProductVariant.objects.filter(is_active=True).prefetch_related("variations__variation_type").select_related("product")
    def get_permissions(self):
        if self.request.method in ["DELETE","PUT","PATCH"]:
            return [IsAdminUser()]
        return [AllowAny()]

    def destroy(self,*args,**kwargs):
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": "Category deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        

    def perform_destroy(self,instance):
        instance.is_active = False
        instance.save(update_fields=["is_active"])
    