from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.render_home_window),
    path('why', views.render_why_window),
    path('team', views.render_team_window),
    path('service', views.render_service_window),
    path('about', views.render_about_window),
    path('main', views.render_main_window),
    path('signin', views.render_signin_window),
    path('signup', views.render_signup_window),
    path('recognize_person', views.recognize_person, name='recognize_person'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)