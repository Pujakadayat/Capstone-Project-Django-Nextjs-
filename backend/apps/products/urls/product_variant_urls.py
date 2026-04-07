from django.urls import path

from apps.products.views.product_variant_view import ProductVariantCreateListView, ProductVariantRetrieveUpdateDeleteView

urlpatterns =[
    path("",ProductVariantCreateListView.as_view(), name="create-list-productvariant"),
    path("<uuid:pk>/", ProductVariantRetrieveUpdateDeleteView.as_view(), name="update-delete-retrieve-productvariant"),
]