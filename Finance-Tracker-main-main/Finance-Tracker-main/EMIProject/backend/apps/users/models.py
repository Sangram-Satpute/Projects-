from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from datetime import timedelta
from core.models import AuditBaseModel
from apps.users.managers import UserManager
from apps.users.validators import validate_profile_picture

class User(AbstractBaseUser, PermissionsMixin, AuditBaseModel):
    """Custom Enterprise User model for FinTrack AI."""

    class Role(models.TextChoices):
        USER = 'USER', 'Standard User'
        ADMIN = 'ADMIN', 'Platform Administrator'

    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active Account'
        LOCKED = 'LOCKED', 'Locked due to Failed Logins'
        INACTIVE = 'INACTIVE', 'Deactivated Account'

    class Gender(models.TextChoices):
        MALE = 'MALE', 'Male'
        FEMALE = 'FEMALE', 'Female'
        OTHER = 'OTHER', 'Other'
        PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY', 'Prefer not to say'

    email = models.EmailField(unique=True, db_index=True)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', validators=[validate_profile_picture], blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=20, choices=Gender.choices, default=Gender.PREFER_NOT_TO_SAY)
    
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.USER)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIVE)
    
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)

    failed_login_attempts = models.PositiveIntegerField(default=0)
    last_failed_login = models.DateTimeField(null=True, blank=True)
    
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def is_account_locked(self) -> bool:
        if self.status == self.Status.LOCKED:
            if self.last_failed_login and timezone.now() > self.last_failed_login + timedelta(minutes=15):
                self.status = self.Status.ACTIVE
                self.failed_login_attempts = 0
                self.save()
                return False
            return True
        return False

    def increment_failed_attempts(self):
        self.failed_login_attempts += 1
        self.last_failed_login = timezone.now()
        if self.failed_login_attempts >= 5:
            self.status = self.Status.LOCKED
        self.save()

    def reset_failed_attempts(self):
        self.failed_login_attempts = 0
        self.last_failed_login = None
        self.save()

    def __str__(self):
        return f"{self.email} ({self.full_name})"
