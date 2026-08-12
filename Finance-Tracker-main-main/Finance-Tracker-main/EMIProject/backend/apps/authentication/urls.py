from django.urls import path
from apps.authentication.views import (
    RegisterView, LoginView, LogoutView, LogoutAllView,
    CustomTokenRefreshView, ChangePasswordView, ForgotPasswordView, ResetPasswordView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('logout-all/', LogoutAllView.as_view(), name='auth_logout_all'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='auth_refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='auth_change_password'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='auth_forgot_password'),
    path('reset-password/', ResetPasswordView.as_view(), name='auth_reset_password'),
]
