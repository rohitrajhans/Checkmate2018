from django.db import models
from django.contrib.auth.models import User
from django.core import validators
import re


class TeamProfile(models.Model):
    team = models.OneToOneField(User, on_delete=models.CASCADE)
    p1_id = models.CharField(max_length=20,validators=[\
        validators.RegexValidator(re.compile('^201[0-9]{1}[0-9A-Z]{4}[0-9]{4}P$'),message='Enter a valid BITS-Mail ID',code='Invalid!')], 
        unique=True)
    p2_id = models.CharField(null=True,blank=False,max_length=20,validators=[\
        validators.RegexValidator(re.compile('^201[0-9]{1}[0-9A-Z]{4}[0-9]{4}P$'),message='Enter a valid BITS-Mail ID',code='Invalid!')],
        unique=True)
    score = models.IntegerField(default=0)
    ip_address = models.CharField(null=True,max_length=20)

    def __str__(self):
        return self.team.username
