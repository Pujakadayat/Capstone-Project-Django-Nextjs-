from apps.users.permissions import IsAdminOrIsStaff, IsStaffUser
from apps.orders.models.order import Order
from apps.orders.serializers import OrderCreateSerializer, OrderReadSerializer, OrderStatusUpdateSerializer
from config.pagination import CustomPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


class OrderListCreateView(generics.ListCreateAPIView):
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user.is_admin_or_is_staff:
            return Order.objects.all().prefetch_related("items__product","items__product_variant")
        return Order.objects.filter(user=user).prefetch_related("items__product","items__product_variant")
    

    def get_serializer_class(self):
        if self.request.method == "POST":
            return OrderCreateSerializer
        return OrderReadSerializer
    
class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    http_method_names=["get","patch"]
    

    def get_queryset(self):
        user = self.request.user
        if user.is_admin_or_is_staff:
           return Order.objects.all().prefetch_related("items")
        return Order.objects.filter(user=user).prefetch_related("items")
    
    def get_permissions(self):
        if self.request.method == "PATCH":
            return [IsAdminOrIsStaff()]
        return [IsAuthenticated()]
    
    def get_serializer_class(self):
        if self.request.method =="PATCH":
            return OrderStatusUpdateSerializer
        return OrderReadSerializer
    
    def perform_update(self,serializer):
        user = self.request.user
        serializer.save(processed_by=user)
    
    def destroy(self,request,*args,**kwargs):
        instance= self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Product  deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    

    
    def perform_destroy(self,instance):
        instance.is_active = False
        instance.save(update_fields = ["is_active"])
        
    

    
