from django.contrib.auth import login, logout
from rest_framework import permissions, status, views, generics
from rest_framework.response import Response
from .serializers import LoginSerializer, UserSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, CreateUserSerializer
from .models import User, PasswordResetToken
from .permissions import IsAdmin
from django.utils import timezone
import uuid
import datetime

class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)
    authentication_classes = () # Bypass global Auth/CSRF checks for login

    def post(self, request, format=None):
        print(f"DEBUG VIEW: Incoming login data: {request.data}")
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(UserSerializer(user).data)

class LogoutView(views.APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class MeView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class ForgotPasswordView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                token_str = str(uuid.uuid4())
                PasswordResetToken.objects.create(
                    user=user,
                    token=token_str,
                    expires_at=timezone.now() + datetime.timedelta(hours=1)
                )
                # In a real app, send email here
                print(f"PASSWORD RESET LINK: http://localhost:3000/reset-password?token={token_str}")
            except User.DoesNotExist:
                pass # Don't reveal user existence
            
            return Response({'message': 'If an account exists with this email, a reset link has been sent.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            token_obj = serializer.validated_data['token_obj']
            user = token_obj.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            # Invalidate all sessions/tokens or just mark this token used
            token_obj.used = True
            token_obj.save()
            
            return Response({'message': 'Password has been reset successfully.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all().order_by('-created_at')
    serializer_class = UserSerializer

class CreateUserView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsAdmin)
    serializer_class = CreateUserSerializer

class RolePermissionView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,) 
    
    def get(self, request):
        from .models import RolePermission
        # Return map: { role_name: [modules] }
        perms = RolePermission.objects.all()
        data = {}
        for p in perms:
            data[p.role] = p.modules
        return Response(data)

    def post(self, request):
        # Create or Update Roles
        # Format: { 'NEW_ROLE': ['mod1', 'mod2'] }
        from .models import RolePermission
        
        # Only admins
        if not request.user.role == 'ADMIN' and not request.user.is_superuser:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)

        incoming_data = request.data
        updated_roles = []
        
        for role_key, modules in incoming_data.items():
            RolePermission.objects.update_or_create(
                role=role_key,
                defaults={'modules': modules}
            )
            updated_roles.append(role_key)

        return Response({"message": f"Updated {len(updated_roles)} roles.", "updated": updated_roles})

    def put(self, request):
        # Rename Role
        # Format: { "oldName": "Manager", "newName": "Ops Manager" }
        from .models import RolePermission, User
        
        if not request.user.role == 'ADMIN' and not request.user.is_superuser:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)

        old_name = request.data.get('oldName')
        new_name = request.data.get('newName')

        if not old_name or not new_name:
             return Response({"detail": "oldName and newName required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            role_obj = RolePermission.objects.get(role=old_name)
            role_obj.role = new_name
            role_obj.save()
            
            # Update Users
            User.objects.filter(role=old_name).update(role=new_name)
            
            return Response({"message": f"Renamed {old_name} to {new_name}"})
        except RolePermission.DoesNotExist:
             return Response({"detail": "Role not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        # Delete Role
        # Query Param: ?role=Manager
        from .models import RolePermission, User
        
        if not request.user.role == 'ADMIN' and not request.user.is_superuser:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)

        role_to_delete = request.query_params.get('role')
        if not role_to_delete:
             return Response({"detail": "Role parameter required."}, status=status.HTTP_400_BAD_REQUEST)

        # Optional: Check if users exist? For now, we'll let them stay with broken role or NULL them.
        # Let's set them to VIEWER or just leave them (they'll have 0 perms if they login)
        
        try:
            RolePermission.objects.get(role=role_to_delete).delete()
            return Response({"message": f"Deleted role {role_to_delete}"})
        except RolePermission.DoesNotExist:
             return Response({"detail": "Role not found."}, status=status.HTTP_404_NOT_FOUND)
