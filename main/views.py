from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login as django_login
from .models import User
from .model import pipeline, Meso4
from django.contrib import messages

def render_home_window(request):
    return render(request, "main/index.html")

def render_about_window(request):
    return render(request, "main/about.html")

def render_service_window(request):
    return render(request, "main/service.html")

def render_team_window(request):
    return render(request, "main/team.html")

def render_why_window(request):
    return render(request, "main/why.html")    

def render_main_window(request):
    return render(request, "main/main.html")    

def render_signin_window(request):
    return render(request, "main/signin.html")   

def render_signup_window(request):
    return render(request, "main/signup.html")

def register(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        c_password = request.POST['c_password']
        if password == c_password:
            user = User.objects.create_user(email=email, password=password)
            user.save()
            return render('main/signin.html')  # Перенаправление на страницу входа после регистрации
        else:
            messages.error(request, 'Passwords must be similar')
            return render('main/signup.html')  
    else:
        return render(request, 'main/signup.html')

def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            django_login(request, user)
            return render('main/main.html')  # Перенаправление на главную страницу после входа
        else:
            messages.error(request, 'Incorrect email or password')
            return render('main/signin.html')
    else:
        return render(request, 'main/signin.html')

def recognize_person(request):
    avg_score = pipeline()
    context = {'confidence': avg_score}
    return render(request, 'main/main.html', context)
 

