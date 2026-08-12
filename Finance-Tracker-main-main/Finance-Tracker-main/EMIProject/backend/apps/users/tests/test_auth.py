import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from apps.users.models import User

@pytest.mark.django_db
class TestAuthenticationAndProfile:
    def setup_method(self):
        self.client = APIClient()
        self.register_url = reverse('auth_register')
        self.login_url = reverse('auth_login')
        self.profile_url = reverse('user_profile')
        self.valid_password = 'Password123!'

    def test_user_registration_success(self):
        data = {
            'email': 'newuser@fintrack.ai',
            'full_name': 'New Enterprise User',
            'phone_number': '+919876543210',
            'password': self.valid_password
        }
        response = self.client.post(self.register_url, data, format='json')
        assert response.status_code == 201
        assert response.data['data']['email'] == 'newuser@fintrack.ai'

    def test_login_and_account_lock_after_5_failed_attempts(self):
        # Register user
        user = User.objects.create_user(
            email='testlock@fintrack.ai',
            password=self.valid_password,
            full_name='Lock Test User'
        )

        # Fail 4 times
        for i in range(4):
            resp = self.client.post(self.login_url, {'email': 'testlock@fintrack.ai', 'password': 'WrongPassword1!'}, format='json')
            assert resp.status_code == 401

        user.refresh_from_db()
        assert user.failed_login_attempts == 4
        assert user.status == User.Status.ACTIVE

        # 5th failed attempt -> Lock account
        resp5 = self.client.post(self.login_url, {'email': 'testlock@fintrack.ai', 'password': 'WrongPassword1!'}, format='json')
        assert resp5.status_code == 403

        user.refresh_from_db()
        assert user.status == User.Status.LOCKED
        assert user.is_account_locked() is True

    def test_jwt_login_and_profile_access(self):
        user = User.objects.create_user(
            email='jwtuser@fintrack.ai',
            password=self.valid_password,
            full_name='JWT User'
        )
        login_resp = self.client.post(self.login_url, {'email': 'jwtuser@fintrack.ai', 'password': self.valid_password}, format='json')
        assert login_resp.status_code == 200
        access_token = login_resp.data['data']['access']

        # Access profile with Bearer Token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        profile_resp = self.client.get(self.profile_url)
        assert profile_resp.status_code == 200
        assert profile_resp.data['data']['email'] == 'jwtuser@fintrack.ai'
