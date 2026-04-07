from apps.users.choice import Role
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password =serializers.CharField(write_only=True,min_length=8,required=True)

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "phone_number",
            "role",
            "image",
            "is_active",
            "created_at",
            "updated_at",
            "password",]
        read_only_fields=["id","created_at","updated_at","role",]
        extra_kwargs = {"email":{"required":False}}

    def validate(self,attrs):
        if self.instance is None and not attrs.get("password"):
            raise serializers.ValidationError({"password":"Password is required"})
        return attrs

    def validate_email(self,value):
        qs = User.objects.filter(email=value)
        if self.instance:
            qs = qs.exclude(pk = self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("This email is already in use")
        return value
    
    def create(self,validated_data):
        return User.objects.create_user(**validated_data)
    
    def update(self,instance,validated_data):
        password = validated_data.pop("password",None)
        for attr,value in validated_data.items():
            setattr(instance,attr,value)
        if password:
            instance.set_password(password)

        instance.save()
        return instance
    
class UserLoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length =10)
    password = serializers.CharField(write_only=True)


# class StaffCreateSerializer(serializers.ModelSerializer):
#     password =serializers.CharField(write_only=True,min_length=8)

#     class Meta:
#         model = User
#         fields = [
#             "id",
#             "full_name",
#             "email",
#             "phone_number",
#             "image",
#             "password",]
#         read_only_fields=["id"]

#     def create(self,validated_data):
#         validated_data["role"]= Role.STAFF
#         return User.objects.create_user(**validated_data)
    
#     def update(self,instance,validated_data):
#         password = validated_data.pop("password",None)
#         for attr,value in validated_data.items():
#             setattr(instance,attr,value)
#         if password:
#             instance.set_password(password)

#         instance.save()
#         return instance


    
