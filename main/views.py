from django.shortcuts import render
from .model import pipeline, Meso4

# Create your views here.

def render_main_window(request):
    return render(request, "main/index.html")

def render_about_window(request):
    return render(request, "main/about.html")

def render_service_window(request):
    return render(request, "main/service.html")

def render_team_window(request):
    return render(request, "main/team.html")

def render_why_window(request):
    return render(request, "main/why.html")    

def recognize_person(request):
    avg_score = pipeline()
    context = {'avg_score': avg_score}
    return render(request, 'main/main_window.html', context)
 

