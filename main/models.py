from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager
from django.core.validators import MinLengthValidator

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    password = models.CharField(max_length=128, validators=[MinLengthValidator(8)])
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email