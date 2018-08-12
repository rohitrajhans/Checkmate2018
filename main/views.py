from django.shortcuts import render, redirect
from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from .models import TeamProfile, UserProfile, GameSwitch
from django.contrib.auth.models import User
from .forms import TeamForm, LoginForm
from ipware.ip import get_ip
import json
from collections import OrderedDict
from django.contrib.auth import authenticate, login, logout as django_logout

answers = OrderedDict([("0", "a"), ("1", "b"), ("2","c"), ("3", "d")])

def index(request):
    if request.user.is_authenticated and request.user.username != 'admin':
        return render(request, 'main/index.html',)
    else:
        return render(request, 'main/login.html',)
    
def register(request):
    up = UserProfile.objects.filter(ip_address=get_ip)
    if up is None or 1:
        team_form = TeamForm(request.POST)
        if request.method == 'POST':
            if team_form.is_valid():
                team_data = team_form.cleaned_data
                team = TeamProfile()
                team.teamname = team_data['teamname1']
                team.p1_id = team_data['p1_id']
                try:
                    t = TeamProfile.objects.get(pk=data['p1_id'])
                    resp = {
                        'status': 'error',
                        'msg': 'BITS ID 1 has already been used to create a Team!'
                    }
                    return HttpResponse(json.dumps(resp), content_type="application/json", status=500)
                except Exception:
                    team.save()
                u = User()
                u.username = team_data['teamname1']
                u.set_password(team_data['password1'])
                try:
                    u.save()
                except IntegrityError:
                    resp={
                    'status': 'error',
                    'msg': 'Team name already registered or other conflicting entries'
                    }
                    return HttpResponse(json.dumps(resp), content_type = "application/json",status=500)
                
                up = UserProfile()
                up.user = u
                up.teamname = team_data['teamname1']
                up.idno1=team_data['p1_id']
                up.idno2=team_data['p2_id']
                up.ip_address = get_ip(request)
                up.save()
                r={
                "status":"redirect",
                "url":"login"
                }
                return HttpResponse(json.dumps(r),content_type="application/json")
            else:
                error=json.loads(json.dumps(form.errors))
                error1=[]
                for e in error:
                    d=e
                    print("d",d)
                    if(d in ["password1","teamname1"]):
                        d=d[:-1]
                    error1.append(d)
                    error1.append('-')
                    error1.append((error[e])[0])
                    error1.append('<br/>')
                print(error1)
                resp={
                'status':'error',
                'msg':' '.join(error1)
                }
                print("reachedbbbbb")
                return HttpResponse(json.dumps(resp), content_type = "application/json",status=500)
        else:
            form=TeamForm(request.POST)
            r={
            "status":"redirect",
            "url":"login"
            }
            return HttpResponse(json.dumps(r),content_type="application/json",status=301)
    else:
        return HttpResponse('You have already registered once from this PC! Contact nearest ACM invigilator')


def login(request):
    if request.user.is_authenticated() and not request.user.username == "admin":
        return redirect('index')
    else:
        team_form=TeamForm(request.POST)
        login_form = LoginForm(request.POST)
        if request.method == 'POST':
            if login_form.is_valid():
                login_data=login_form.cleaned_data
                teamname = login_data['teamname']
                password = login_data['password']
                user = authenticate(username = teamname, password=password)
                if user is not None:
                    auth.login(request, user)
                    return redirect('index')
                else:
                    resp={
                    'status':'error',
                    'msg':'Register before you try to Login!'
                    }
                    return HttpResponse(json.dumps(resp), content_type = "application/json",status=500)
            else:
                error=json.loads(json.dumps(lform.errors))
                error1=[]
                for e in error:
                    d=e
                    print("d",d)
                    if(d in ["password1","teamname1"]):
                        d=d[:-1]
                    error1.append(d)
                    error1.append('-')
                    error1.append((error[e])[0])
                    error1.append('<br/>')
                print(error1)
                resp={
                'status':'error',
                'msg':' '.join(error1)
                }
                print("reachedbbbbb")
                return HttpResponse(json.dumps(resp), content_type = "application/json",status=500)
        else:
            login_form=LoginForm(request.POST)
            return render(request, 'main/login.html',{'login_form':login_form,'team_form':team_form})
        return render(request, 'main/login.html',{'login_form':login_form,'team_form':team_form})

def logout(request):
    django_logout(request)
    return render(request, 'main/index.html')

def leaderboard(request):
    teams_list = TeamProfile.objects.all()
    top5list = teams_list.order_by('score')[:5]
    current_team = request.user
    context = {
        'top5list': top5list,       # List of 5 TeamProfile Objects
        'current_team': current_team,
    }
    return render(request, 'main/leaderboard.html', context)


def send_answer(request):
    return HttpResponse(json.dumps(answers))
