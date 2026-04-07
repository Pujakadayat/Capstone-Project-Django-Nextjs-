from django.urls import path

from apps.products.views.category_view import CategoryCreateListView, CategoryRetrieveUpdateDeleteView

urlpatterns =[
    path("",CategoryCreateListView.as_view(), name="create-list-category"),
    path("<uuid:pk>/", CategoryRetrieveUpdateDeleteView.as_view(), name="update-delete-retrieve-category"),
]