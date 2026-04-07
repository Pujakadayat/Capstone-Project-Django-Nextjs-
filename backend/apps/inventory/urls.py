from django.urls import path
from apps.inventory.views import InventoryStockListCreateView

urlpatterns = [
    path("", InventoryStockListCreateView.as_view()
, name="stock-list-create"),
 
]
