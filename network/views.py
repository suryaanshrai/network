from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .models import User, Posts, Like


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

@login_required
def createpost(request):
    if request.method == "POST":
        poster = request.user
        post_content = request.POST["content"]
        new_post = Posts(poster=poster, content=post_content)
        new_post.save()
        return HttpResponseRedirect(reverse("index"))
    else:
        return HttpResponse("Please login and submit the form. (Post method required)")

def getAllPosts(request):
    allPosts = list(Posts.objects.values())

    for post in allPosts:
        username = User.objects.get(id=post['poster_id']).username
        post['username']=username
        post['likecount']=len(Like.objects.filter(post_id=post['id']))
        if request.user.is_authenticated:
            liked = Like.objects.filter(user=request.user, post=Posts.objects.get(id=post['id']))
            if len(liked) == 0:
                post['liked'] = False
            else:
                post['liked'] = True
    return JsonResponse({
        "allPosts": allPosts
    })

@login_required
def like_post(request, postid):
    # Likes or Unlikes a post
    if request.method == "POST":
        if (len(Like.objects.filter(user=request.user, post=Posts.objects.get(id=postid))) == 0):
            new_like = Like(user=request.user, post=Posts.objects.get(id=postid))
            new_like.save()
            return HttpResponse('Liked')
        else:
            new_like = Like.objects.get(user=request.user, post=Posts.objects.get(id=postid))
            new_like.delete()
            return HttpResponse('Unliked')
    return HttpResponse('Invalid Request')

def userpage(request, username):
    user = User.objects.get(username=username)
    allposts = list(Posts.objects.filter(poster=user).values())

    for post in allposts:
        post['likecount']=len(Like.objects.filter(post_id=post['id']))
        liked=[1]
        if len(liked) == 0:
            post['liked'] = False
        else:
            post['liked'] = True
    follower = len(user.followers.all())
    following = len(user.following.all())
    return render(request, "network/userpage.html", {
        "username":username,
        "posts":allposts,
        "followers":follower,
        "following": following
    })