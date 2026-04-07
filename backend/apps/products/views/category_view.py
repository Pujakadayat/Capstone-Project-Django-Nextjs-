from apps.users.permissions import  IsAdminUser
from apps.products.models.category import ProductCategory
from apps.products.serializers import CategoryListSerializer, CategorySerializer
from config.pagination import CustomPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework import generics



class CategoryCreateListView(generics.ListCreateAPIView):
    queryset = ProductCategory.objects.filter(is_active=True)
    pagination_class = CustomPagination

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return [AllowAny()]
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return CategoryListSerializer
        return CategorySerializer
    
    def perform_create(self,serializer):
        serializer.save()
        
class CategoryRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductCategory.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    def get_permissions(self):
        if self.request.method in ["DELETE","PATCH"]:
            return [IsAdminUser()]
        return [AllowAny()]
    def destroy(self,*args,**kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Category deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    

    def perform_destroy(self,instance):
        instance.is_active = False
        instance.save(update_fields=["is_active"])
    
