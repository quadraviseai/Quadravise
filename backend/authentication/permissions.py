from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'ADMIN'

class IsFinanceManager(permissions.BasePermission):
    def has_permission(self, request, view):
        # Admin also has finance manager rights (as per req: "All Finance Manager rights")
        return request.user and (request.user.role == 'FINANCE_MANAGER' or request.user.role == 'ADMIN')
