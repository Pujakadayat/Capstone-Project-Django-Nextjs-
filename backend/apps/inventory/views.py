
from apps.inventory.models import InventoryStock
from apps.inventory.serializers import InventoryStockReadSerializer, InventoryStockWriteSerializer
from apps.users.permissions import IsAdminOrIsStaff
from config.pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend


class InventoryStockListCreateView(generics.ListCreateAPIView):
    
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["product","product_variant","transaction_type"]
    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminOrIsStaff()]
        return [IsAuthenticated]
    def get_serializer_class(self):
        if self.request.mthod =="POST":
            return InventoryStockWriteSerializer
        return InventoryStockReadSerializer

    def get_queryset(self):
        return InventoryStock.objects.filter(is_active=True).select_related("product","product_variant","created_by","order")

