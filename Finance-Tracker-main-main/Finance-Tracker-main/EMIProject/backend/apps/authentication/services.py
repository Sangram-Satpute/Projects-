from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken, BlacklistedToken
from rest_framework import exceptions
from django.contrib.auth import authenticate
from apps.users.repositories import UserRepository

class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()

    def login(self, email, password):
        user = self.user_repo.get_by_email(email)
        if not user:
            raise exceptions.AuthenticationFailed("Invalid email or password.")

        if user.is_account_locked():
            raise exceptions.PermissionDenied("Account is temporarily locked due to multiple failed login attempts. Please try again after 15 minutes.")

        authenticated_user = authenticate(username=email, password=password)
        if not authenticated_user:
            user.increment_failed_attempts()
            remaining = 5 - user.failed_login_attempts
            if remaining > 0:
                raise exceptions.AuthenticationFailed(f"Invalid email or password. {remaining} attempt(s) remaining before account lockout.")
            else:
                raise exceptions.PermissionDenied("Account has been locked due to 5 consecutive failed login attempts.")

        user.reset_failed_attempts()
        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": str(user.id),
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role
            }
        }

    def logout(self, refresh_token_str):
        try:
            token = RefreshToken(refresh_token_str)
            token.blacklist()
        except Exception:
            raise exceptions.ValidationError("Invalid or expired refresh token.")

    def logout_all(self, user):
        tokens = OutstandingToken.objects.filter(user=user)
        for token in tokens:
            try:
                BlacklistedToken.objects.get_or_create(token=token)
            except Exception:
                pass
