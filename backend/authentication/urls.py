from django.urls import path
from .views import LoginView, LogoutView, MeView, ForgotPasswordView, ResetPasswordView, UserListView, CreateUserView, RolePermissionView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', MeView.as_view(), name='me'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    # Users
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/create/', CreateUserView.as_view(), name='create-user'),
    path('users/permissions/', RolePermissionView.as_view(), name='role-permissions'),
]
