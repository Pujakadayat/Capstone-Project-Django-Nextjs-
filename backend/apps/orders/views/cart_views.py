from apps.users.permissions import IsStaffOrCustomer
from apps.orders.models.cart import Cart
from apps.orders.serializers import CartSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class CartRetrieveView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes= [IsAuthenticated]

    def get_object(self):
        cart,_ =  Cart.objects.get_or_create(user = self.request.user)
        return cart
    

    

    