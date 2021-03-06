from django.conf.urls import url
from . import views


urlpatterns = [
    url('index/', views.index, name='index'),
    url('register/$', views.register, name='register'),
    url('login/$', views.login, name='login'),
    url('logout/$', views.logout, name='logout'),
    url('leaderboard/$', views.leaderboard, name='leaderboard'),
    url('send_answer/$', views.send_answer, name='send_answer'),
]
