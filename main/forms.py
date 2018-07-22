from django.contrib.auth.models import User
from django import forms
from .models import TeamProfile
import re
from django.core import validators


class TeamForm(forms.Form):
    teamname = forms.CharField(max_length=50)
    password = forms.CharField(widget=forms.PasswordInput(),max_length=50)
    p1_id = forms.CharField(max_length=20,validators=[\
        validators.RegexValidator(re.compile('^201[0-9]{1}[0-9A-Z]{4}[0-9]{4}P'),message='BITS ID of Teammate 1 is empty or invalid',code='Invalid!')])
    p2_id = forms.CharField(required=False,max_length=20,validators=[\
        validators.RegexValidator(re.compile('^201[0-9]{1}[0-9A-Z]{4}[0-9]{4}P'),message='BITS ID of Teammate 2 is empty or invalid',code='Invalid!')])
