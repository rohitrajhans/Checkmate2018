from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from .models import TeamProfile, UserProfile
from django.contrib.auth.models import User
from .forms import TeamForm
from ipware.ip import get_ip
import json
from collections import OrderedDict

####################
# Answers sent via json using function send_answer
answers = OrderedDict([("0", "a"), ("1", "b"), ("2","c"), ("3", "d")])

###################################

def index(request):
    return render(request, 'main/index.html')

def register(request):
    up = UserProfile.objects.filter(ip_address=get_ip)
    if up is None or 1:
        print("reached0")
        form = TeamForm(request.POST)
        if request.method == 'POST':
            if form.is_valid():
                print (form)
                print("reached1")
                data = form.cleaned_data
                ###  Patch for Issue 2
                ###  TeamProfile object created here.
                team = TeamProfile()
                team.teamname = data['teamname1']
                team.p1_id = data['p1_id']
                try:
                    t = TeamProfile.objects.get(pk=data['p1_id'])
                    resp = {
                        'status': 'error',
                        'msg': 'BITS ID 1 has already been used to create a Team!  '
                    }
                    return HttpResponse(json.dumps(resp), content_type="application/json", status=500)
                except Exception:
                    team.save()
                ### Patch Ends
                u = User()
                u.username = data['teamname1']
                u.set_password(data['password1'])
                try:
                    u.save()
                except IntegrityError:
                    print("reached2")
                    resp={
                    'status': 'error',
                    'msg': 'Team name already registered or other conflicting entries'
                    }
                    return HttpResponse(json.dumps(resp), content_type = "application/json",status=500)
                
                up = UserProfile()
                up.user = u
                up.teamname = data['teamname1']
                up.idno1=data['p1_id']
                up.idno2=data['p2_id']
                up.ip_address = get_ip(request)
                up.save()
                #return redirect('mainapp:login')
                r={
                "status":"redirect",
                "url":"login"
                }
                print("reachedXXXX")
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
            print("reached3")
            return HttpResponse(json.dumps(r),content_type="application/json",status=301)
    else:
        return HttpResponse('You have already registered once from this pc! Contact nearest ACM invigilator')


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
        return render(request, 'main/login.html', {})

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


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
