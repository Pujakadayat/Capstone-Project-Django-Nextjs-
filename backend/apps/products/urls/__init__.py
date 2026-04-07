from django.urls import path,include

urlpatterns = [
    path("categories/",include("apps.products.urls.category_urls")),
    path("",include("apps.products.urls.product_urls")),
    path("variants/",include("apps.products.urls.product_variant_urls")),
]

