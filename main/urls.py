from django.conf.urls import url
from . import views


urlpatterns = [
    url('index/', views.index, name='index'),
    url('register/$', views.register, name='register'),
    url('login/$', views.login, name='login'),
    url('logout/$', views.logout_view, name='logout'),
    # url('leaderboard/$', views.leaderboard, name='leaderboard'),
]
