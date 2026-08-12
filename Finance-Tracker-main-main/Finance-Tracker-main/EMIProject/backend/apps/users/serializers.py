from rest_framework import serializers
from apps.users.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'email', 'full_name', 'phone_number', 'profile_picture',
            'date_of_birth', 'gender', 'role', 'status', 'email_verified',
            'phone_verified', 'last_login', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'email', 'role', 'status', 'email_verified', 'phone_verified', 'last_login', 'created_at', 'updated_at')

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('full_name', 'phone_number', 'profile_picture', 'date_of_birth', 'gender')
