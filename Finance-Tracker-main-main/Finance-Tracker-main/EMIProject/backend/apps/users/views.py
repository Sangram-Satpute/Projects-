from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers import UserProfileSerializer, UserProfileUpdateSerializer
from apps.users.services import UserService

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(responses={200: UserProfileSerializer}, summary="Retrieve authenticated user profile details")
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=UserProfileUpdateSerializer, responses={200: UserProfileSerializer}, summary="Update authenticated user profile information")
    def put(self, request):
        serializer = UserProfileUpdateSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user_service = UserService()
        updated_user = user_service.update_profile(request.user, serializer.validated_data)
        return Response(UserProfileSerializer(updated_user).data, status=status.HTTP_200_OK)

    @extend_schema(request=UserProfileUpdateSerializer, responses={200: UserProfileSerializer}, summary="Partial update authenticated user profile information")
    def patch(self, request):
        return self.put(request)

class UserProfileAvatarDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(summary="Delete authenticated user profile picture")
    def delete(self, request):
        user_service = UserService()
        updated_user = user_service.delete_profile_picture(request.user)
        return Response(UserProfileSerializer(updated_user).data, status=status.HTTP_200_OK)
