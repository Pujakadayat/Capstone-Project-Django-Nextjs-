from django.urls import path

from apps.products.views.product_view import ProductCreateListView, ProductRetrieveUpdateDeleteView

urlpatterns =[
    path("",ProductCreateListView.as_view(), name="create-list-product"),
    path("<uuid:pk>/", ProductRetrieveUpdateDeleteView.as_view(), name="update-delete-retrieve-product"),
]