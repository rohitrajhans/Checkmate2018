from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from .models import TeamProfile
from .forms import TeamForm
from ipware.ip import get_ip


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
            team_data.ip_address = get_ip(request)
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
    return HttpResponseRedirect(reverse('index'))


def leaderboard(request):
    teams_list = TeamProfile.objects.all()
    top5list = teams_list.order_by('score')[:5]
    current_team = request.team
    context = {
        'top5list': top5list,       # List of 5 TeamProfile Objects
        'current_team': current_team,
    }
    return render(request, 'main/leaderboard.html', context)
