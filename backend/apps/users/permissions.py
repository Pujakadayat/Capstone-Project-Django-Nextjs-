from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_admin


class IsStaffUser(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user.is_authenticated and request.user.is_staff_role
    
class IsCustomerUser(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user.is_authenticated and request.user.is_customer

class IsAdminOrIsStaff(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user.is_authenticated and (request.user.is_admin  or request.user.is_staff)
    
class IsStaffOrCustomer(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user.is_authenticated and (request.user.is_staff or request.user.is_customer)