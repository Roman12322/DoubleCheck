from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import login as django_login
from django.views.decorators.csrf import csrf_exempt
from django.core.files.uploadedfile import TemporaryUploadedFile, InMemoryUploadedFile
from .models import User
from .model import pipeline_InMemory, Meso4
from django.contrib import messages
import io
import base64

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
        try:
            email = request.POST['email']
            password = request.POST['password']
            c_password = request.POST['c_password']
            if password == c_password:
                user = User.objects.create(email=email, password=password)
                user.save()
                return render(request, 'main/signin.html')  # Перенаправление на страницу входа после регистрации
            else:
                messages.error(request, 'Passwords must be similar')
                return render(request, 'main/signup.html')  
        except:
            messages.error(request, 'Passwords must be similar')
            return render(request, 'main/signup.html')          
    else:
        return render(request, 'main/signup.html')

def login(request):
    if request.method == 'POST':
        try:
            email = request.POST['email']
            password = request.POST['password']
            user = User.objects.get(email=email, password=password)
            print(user)
            if user is not None:
                django_login(request, user)
                return render(request, 'main/main.html')  # Перенаправление на главную страницу после входа
            else:
                messages.error(request, 'Incorrect email or password')
                return render(request, 'main/signin.html')
        except:
            messages.error(request, 'Incorrect email or password')
            return render(request, 'main/signin.html')    
    else:
        return render(request, 'main/signin.html')

@csrf_exempt
def recognize_person(request):
    if request.method == 'POST':
        try:
            video_filename = request.POST.get('filename', None)
            print(f"video name {video_filename}")
            print(f"{request.POST} post")
            video = (request.FILES.get(video_filename.split('.')[0], None))
            print(f"video as a file {video} | video.filetype {video.file}")
            if video:
                if isinstance(video, InMemoryUploadedFile):
                    avg_score = pipeline_InMemory(file=video.file)
                    success = f"Chance that you're not a deepfake : {round(avg_score, 2)}"
                    return HttpResponse(success)
                else:
                    # tmp_file = io.BytesIO(base64.b64decode(video.read()))
                    avg_score = pipeline_InMemory(file=video.file)
                    success = f"Chance that you're not a deepfake : {round(avg_score, 2)}"
                    return HttpResponse(success)
            else:
                message = "Record haven't found, please try again!"
                print(f"{request.FILES} просто request.FILES")
                return HttpResponse(message)
        except Exception as e:
            message = "Record haven't found, please try again!"
            print(e)
            return HttpResponse(message)

    else:
        failed_response = f"failed response"
        return HttpResponse(failed_response)
 

