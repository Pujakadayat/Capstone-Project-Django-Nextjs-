from apps.users.permissions import IsCustomerUser, IsStaffOrCustomer, IsStaffUser
from apps.orders.serializers import OrderItemReadSerializer, OrderItemWriteSerializer
from apps.orders.models.orderitem import OrderItem
from config.pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


class OrderItemCreateView(generics.CreateAPIView):
    pagination_class = CustomPagination
    serializer_class = OrderItemWriteSerializer

    def get_queryset(self):
        user = self.request.user
        return OrderItem.objects.filter(is_active=True,order__user=user)
    
    def get_permissions(self):
        if self.request.user.is_customer:
            return [IsCustomerUser()]
        return [IsStaffUser()]
    
    
class OrderItemListView(generics.ListAPIView):
    serializer_class = OrderItemReadSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        return OrderItem.objects.filter(is_active=True).select_related("order","product","product_variant")
    
    def get_permissions(self):
        user = self.request.user
        if user.is_customer or user.is_staff:
            return [IsStaffOrCustomer()]
        return [IsAuthenticated()]
    

    
