from django.urls import path
from . import views

urlpatterns = [
    path('', views.render_main_window),
    path('recognize_person', views.recognize_person, name='recognize_person'),
]
