
from apps.users.permissions import IsAdminOrIsStaff, IsAdminUser
from apps.users.token import CustomRefreshToken
from apps.users.choice import Role
from config.pagination import CustomPagination
from .serializers import UserLoginSerializer, UserSerializer
from django.contrib.auth import authenticate,get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.filters import SearchFilter

User = get_user_model()

class UserCreateView(APIView):
    def get_permissions(self):
        user = self.request.user
        if user.is_authenticated and user.is_admin:
            return [IsAdminUser()]
        return [AllowAny()]
    
    
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        if user.is_authenticated and user.is_admin:
            user =serializer.save(role=Role.STAFF)
            message ="Staff Account Created Successfully"
        else:
            user =serializer.save(role=Role.CUSTOMER)
            message = "Account Created Successfully"
        return Response({"message":message,"data":serializer.data},status=status.HTTP_201_CREATED)
    
class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self,request,*args,**kwargs):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        phone_number = serializer.validated_data["phone_number"]
        password = serializer.validated_data["password"]
        user =authenticate(request,username=phone_number,password=password)

        if not user:
            return Response(
                {"detail": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
        refresh = CustomRefreshToken.for_user(user)
        return Response({
            "refresh":str(refresh),
            "access":str(refresh.access_token),
            "user_id":str(user.id),
            "role":user.role
        })

class UserListView(generics.ListAPIView):
    permission_classes = [IsAdminOrIsStaff]
    serializer_class = UserSerializer
    pagination_class = CustomPagination
    filter_backends = [SearchFilter]
    search_fields =["full_name","phone_number","email"]
    def get_queryset(self):
        user =self.request.user
        if user.is_admin:
            return User.objects.all()
        return User.objects.filter(role = Role.CUSTOMER)


class UserUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    http_method_names = ["get","patch","delete"]
    def get_queryset(self):
        user =self.request.user
        if user.is_admin:
            return User.objects.all()
        return User.objects.filter(pk=user.pk)

    def get_object(self):
        return generics.get_object_or_404(self.get_queryset(),pk=self.kwargs["pk"])

      
    def destroy(self,request,*args,**kwargs):
        instance = self.get_object()
        if instance == request.user:
            return Response(
                {"error": "You cannot delete your own account"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        instance.is_active = False
        instance.save(update_fields = ["is_active"])
        return Response({"message": "Account deactivated successfully"}, status=status.HTTP_200_OK)
    
class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
             return Response(
                {"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST
            )
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully Logged out."})
        except Exception as e:
            return Response(
                {"error": "Invalid or expired token"},
                status=status.HTTP_400_BAD_REQUEST,
            )