
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("createpost", views.createpost, name="createpost"),
    path("getAllPosts", views.getAllPosts, name="getAllPosts"),
    path("likePost/<int:postid>", views.like_post, name="likePost"),
    path("user/<str:username>", views.userpage, name="userpage"),
    path("follow/<str:tofollow>", views.follow, name="follow"),
    path("following", views.following_posts, name="following"),
    path("isloggedin",views.isloggedin, name="isloggedin"),
    path("editpost",views.editpost,name="editpost"),
]
