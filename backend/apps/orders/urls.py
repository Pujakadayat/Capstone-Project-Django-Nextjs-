from django.urls import path
from apps.orders.views import CartItemListCreateView,CartItemDetailView,CartRetrieveView
from apps.orders.views.order_views import OrderDetailView, OrderListCreateView
from apps.orders.views.orderitem_views import OrderItemCreateView,OrderItemListView

urlpatterns = [
    # Cart
    path("cart/", CartRetrieveView.as_view(), name="cart"),
    path("cart/items/", CartItemListCreateView.as_view(), name="cart-items"),
    path("cart/items/<uuid:pk>/", CartItemDetailView.as_view(), name="cart-item-detail"),
 
    # Orders
    path("orders/", OrderListCreateView.as_view(), name="order-list-create"),
    path("orders/<uuid:pk>/", OrderDetailView.as_view(), name="order-detail"),

    # OrderItem
      path("order-item/", OrderItemListView.as_view(), name="order-item-list"),
    path("order-item/create/", OrderItemCreateView.as_view(), name="order-item-create"),

]
 