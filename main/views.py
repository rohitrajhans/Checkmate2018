from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from .models import TeamProfile
from .forms import TeamForm


def index(request):
    return render(request, 'main/index.html', {})

def register(request):
    registered = False
    if request.method == 'POST':
        team_form = TeamForm(data=request.POST)
        if team_form.is_valid():
            team = team_form.save()
            for pteam in TeamProfile.objects.all():
                if pteam.p1_id == team.p1_id or pteam.p2_id == team.p2_id:
                    print("Same BITS ID used across different teams.")
                    return render(request, 'index/', {})
            team.save()
            registered = True
        else:
            print(team_form.errors)
    else:
        team_form = TeamForm()

    return HttpResponseRedirect(reverse('index'))

def login(request):
    if request.method == 'POST':
        teamname = request.POST.get('teamname')
        password = request.POST.get('password')
        team = authenticate(username=teamname, password=password)
        if team:
            login(request, team)
            return HttpResponseRedirect(reverse('index'))
        else:
            return HttpResponse("Invalid login details supplied.")
    else:
        return HttpResponseRedirect(reverse('index'))

def logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))
