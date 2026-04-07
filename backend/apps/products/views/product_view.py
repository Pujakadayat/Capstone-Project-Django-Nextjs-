from apps.users.permissions import IsAdminOrIsStaff
from apps.products.serializers import ProductListSerializer, ProductSerializer
from apps.products.models.products import Product

from config.pagination import CustomPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework import generics


class ProductCreateListView(generics.ListCreateAPIView):
    pagination_class = CustomPagination

    def  get_queryset(self):
        return  Product.objects.filter(is_active=True).prefetch_related("categories")
    
    

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminOrIsStaff()]
        return [AllowAny()]
    def get_serializer_class(self):
        if self.request.method == "POST":
            return ProductSerializer
        return  ProductListSerializer
    
    def perform_create(self,serializer):

        serializer.save()
    
    
class ProductRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    
    serializer_class = ProductSerializer

    def get_queryset(self):
        return  Product.objects.filter(is_active=True).prefetch_related("categories")
    
    def get_permissions(self):
        if self.request.method in ["DELETE","PUT","PATCH"]:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]

    def destroy(self,*args,**kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Category deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    

    def perform_destroy(self,instance):
        instance.is_active = False
        instance.save(update_fields=["is_active"])
    
    def retrieve(self,request,*args,**kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance)
        return Response(serializer.data)
    
    