from django.shortcuts import render
from .model import pipeline, Meso4

# Create your views here.

def render_main_window(request):
    return render(request, "main_window.html")

def recognize_person(request):
    avg_score = pipeline()
    context = {'avg_score': avg_score}
    return render(request, 'main_window.html', context)
 

