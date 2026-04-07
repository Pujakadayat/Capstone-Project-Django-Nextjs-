from django.urls import path
from . import views

urlpatterns = [
    path("", views.UserCreateView.as_view(), name="register-user"),
    path("login/", views.UserLoginView.as_view(), name="login-user"),
    path("list/", views.UserListView.as_view(), name="get-users"),
    path("logout/", views.UserLogoutView.as_view(), name="logout"),
    path("<uuid:pk>/", views.UserUpdateDeleteView.as_view(), name="update-delete-user"),
]
