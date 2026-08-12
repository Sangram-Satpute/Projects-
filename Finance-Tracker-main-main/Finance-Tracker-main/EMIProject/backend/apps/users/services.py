from apps.users.repositories import UserRepository

class UserService:
    def __init__(self):
        self.user_repo = UserRepository()

    def update_profile(self, user, data):
        return self.user_repo.update(user, **data)

    def delete_profile_picture(self, user):
        if user.profile_picture:
            user.profile_picture.delete(save=False)
            user.profile_picture = None
            user.save()
        return user
