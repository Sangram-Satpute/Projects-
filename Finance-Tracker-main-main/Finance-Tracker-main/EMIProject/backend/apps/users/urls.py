from django.urls import path
from apps.users.views import UserProfileView, UserProfileUpdateView, UserProfileAvatarDeleteView

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='user_profile_update'),
    path('profile/avatar/', UserProfileAvatarDeleteView.as_view(), name='user_profile_avatar_delete'),
]
