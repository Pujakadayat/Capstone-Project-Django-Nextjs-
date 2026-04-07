from apps.orders.models.cart import Cart
from apps.orders.models.cartitem import CartItem
from apps.orders.serializers import CartItemReadSerializers, CartItemWriteSerializers
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class CartItemListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CartItem.objects.filter(cart__user=user).select_related("product","product_variant")



    def get_serializer_class(self):
        if self.request.method == "POST":
            return CartItemWriteSerializers
        return CartItemReadSerializers
    
    def perform_create(self,serializer):
        cart, _ = Cart.objects.get_or_create(user = self.request.user)
        serializer.save(cart=cart)

class CartItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemWriteSerializers
    permission_classes = [IsAuthenticated]
    http_method_names = ["patch","delete"]

    def get_queryset(self):
        user=self.request.user
        return CartItem.objects.filter(cart__user=user)
    
    def destroy(self,request,*args,**kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message":"Item removed from cart"},status=status.HTTP_200_OK)
    