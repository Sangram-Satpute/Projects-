from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.views import TokenRefreshView

from apps.authentication.serializers import (
    RegisterSerializer, LoginSerializer, TokenResponseSerializer,
    LogoutSerializer, ChangePasswordSerializer, ForgotPasswordSerializer, ResetPasswordSerializer
)
from apps.authentication.services import AuthService
from apps.users.serializers import UserProfileSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=RegisterSerializer, responses={211: UserProfileSerializer}, summary="Register new user account")
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserProfileSerializer(user).data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=LoginSerializer, responses={200: TokenResponseSerializer}, summary="Authenticate user & issue JWT tokens")
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        auth_service = AuthService()
        result = auth_service.login(
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        return Response(result, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=LogoutSerializer, summary="Logout user & blacklist refresh token")
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        auth_service = AuthService()
        auth_service.logout(serializer.validated_data['refresh'])
        return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)

class LogoutAllView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(summary="Logout user from all devices & blacklist all active refresh tokens")
    def post(self, request):
        auth_service = AuthService()
        auth_service.logout_all(request.user)
        return Response({"message": "Successfully logged out from all devices."}, status=status.HTTP_200_OK)

class CustomTokenRefreshView(TokenRefreshView):
    @extend_schema(summary="Refresh JWT access token")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=ChangePasswordSerializer, summary="Change user account password")
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({"error": "Incorrect current password."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=ForgotPasswordSerializer, summary="Request password reset email link")
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "If the email is registered, a password reset token has been dispatched."}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=ResetPasswordSerializer, summary="Reset password using reset token")
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        from apps.users.repositories import UserRepository
        user = UserRepository().get_by_email(serializer.validated_data['email'])
        if user:
            user.set_password(serializer.validated_data['new_password'])
            user.save()
        return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)
