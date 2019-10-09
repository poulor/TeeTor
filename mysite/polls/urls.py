from django.urls import include, path
from django.contrib import admin
import django

from . import views

print(django.get_version())

urlpatterns = [
    path('', views.index, name='index'),
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]