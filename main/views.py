from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from .models import TeamProfile
from .forms import TeamForm


def index(request):
    answers = []
    return render(request, 'main/index.html', {'answers': answers})

def register(request):
    registered = False
    if request.method == 'POST':
        team_form = TeamForm(request.POST)
        if team_form.is_valid():
            team_data = team_form.cleaned_data
            if team_data.p1_id == team_data.p2_id:
                print("Same BITS ID used for the same team.")
                return render(request, 'index/', {})
            registered_teams = TeamProfile.objects.all()
            for registered_team in registered_teams:
                if (registered_team.p1_id == team_data.p1_id or registered_team.p2_id == team_data.p2_id or
                    registered_team.p1_id == team_data.p2_id or registered_team.p2_id == team_data.p1_id):
                    print("Same BITS ID used across different teams.")
                    return render(request, 'index/', {})
            team_data.save()
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
