from django.conf.urls import url
from . import views


urlpatterns = [
    url('index/', views.index, name='index'),
    url('register/$', views.register, name='register'),
    url('login/$', views.register, name='login'),
    url('logout/$', views.register, name='logout'),
]
