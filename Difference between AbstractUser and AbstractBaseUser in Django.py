# Difference between AbstractUser and AbstractBaseUser in Django
# This is one of the most important concepts when creating a custom user model.
#
# 1. AbstractUser
# AbstractUser is simply Django's default User model with the ability to extend it.
# The default Django User already has:
#
# username
# password
# email
# first_name
# last_name
# is_staff
# is_active
# is_superuser
# groups
# user_permissions
# date_joined
# last_login
#
# You can simply add your own fields.
# Example:

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone = models.CharField(max_length=15)
    age = models.IntegerField(null=True, blank=True)

# Now your user has:
#
# username
# password
# email
# first_name
# last_name
# phone
# age
# ...
#
# Almost no extra work.
#
# 2. AbstractBaseUser
# This gives you only the authentication foundation.
# It mainly provides:
# password hashing
# password checking
# last_login
# That's it.
# You have to create everything else yourself.
# Example:

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)

    USERNAME_FIELD = "email"

    objects = UserManager()

# You also need to create:
# custom manager
# create_user()
# create_superuser()
# is_staff
# is_active
# USERNAME_FIELD
# REQUIRED_FIELDS
# So there is much more code.
#
# Why use AbstractBaseUser?
# Suppose your company says:
# We don't want usernames.
# Users should log in using only their phone number.
# With AbstractUser, the username field is still part of the model (even if you try to ignore it), making this awkward.
# With AbstractBaseUser, you can define exactly what a user looks like.
# Example:

class User(AbstractBaseUser, PermissionsMixin):
    phone = models.CharField(max_length=15, unique=True)

    USERNAME_FIELD = "phone"

# Now authentication is based entirely on phone numbers.
