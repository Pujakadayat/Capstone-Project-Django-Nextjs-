from django.urls import path
from apps.products.views.brand_view import BrandCreateListView,BrandDetailView
urlpatterns =[
    path("",BrandCreateListView.as_view(), name="create-list-brand"),
    path("<uuid:pk>/", BrandDetailView.as_view(), name="update-delete-retrieve-brand"),
]