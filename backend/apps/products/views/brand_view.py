from apps.users.permissions import  IsAdminUser
from apps.products.serializers.brand_serializer import BrandSerializer
from apps.products.models.brand import Brand
from config.pagination import CustomPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework import generics



class BrandCreateListView(generics.ListCreateAPIView):
    queryset = Brand.objects.filter(is_active=True)
    pagination_class = CustomPagination
    serializer_class = BrandSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return [AllowAny()]
    
    
        
class BrandDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    def get_permissions(self):
        if self.request.method in ["DELETE","PATCH","PUT"]:
            return [IsAdminUser()]
        return [AllowAny()]
    
    def destroy(self,request,*args,**kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save(update_fields=["is_active"])
        return Response({"message": "Brand deleted successfully!"}, status=status.HTTP_200_OK)
    
    def retrieve(self,request,*args,**kwargs):
        queryset =self.get_object()
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
