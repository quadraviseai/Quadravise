import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quadravise_backend.settings')
django.setup()

from authentication.models import User

from django.contrib.auth import authenticate

from django.conf import settings

def reset_password():
    print(f"DEBUG SCRIPT: Active Database Name: {settings.DATABASES['default']['NAME']}")
    print(f"DEBUG SCRIPT: Active Database Host: {settings.DATABASES['default']['HOST']}")

    email = "subhojitroypf@gmail.com"
    new_password = "password123"
    
    print(f"Attempting to reset password for: {email}")
    
    try:
        if not User.objects.filter(email=email).exists():
            print(f"User {email} not found. Creating new superuser...")
            User.objects.create_superuser(
                email=email,
                password=new_password,
                first_name="Admin",
                last_name="User"
            )
            print("Superuser created successfully.")
        else:
            user = User.objects.get(email=email)
            user.set_password(new_password)
            user.role = 'ADMIN'
            user.is_superuser = True
            user.is_staff = True
            user.is_active = True  # Ensure user is active
            user.save()
            print("Password updated successfully.")
            
        # Verify immediately
        user = authenticate(email=email, password=new_password)
        if user:
            print("VERIFICATION SUCCESS: authenticate() returned the user.")
        else:
            print("VERIFICATION FAILED: authenticate() returned None.")
            
        print(f"Credentials:")
        print(f"Email: {email}")
        print(f"Password: {new_password}")
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == '__main__':
    reset_password()
