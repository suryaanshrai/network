document.addEventListener('DOMContentLoaded', () => {
    loadPage('AllPosts');
    getAllPosts();
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function toggle(button){
    if(button.innerHTML === 'Like') {
        button.innerHTML = 'Unlike';
    }
    else {
        button.innerHTML = 'Like';
    }
}
function getAllPosts() {
    fetch("/getAllPosts")
    .then(response => response.json())
    .then(data => {

        loadPosts(data);
        pagination(data.page);
    });
}

function loadPage(pageName) {
    document.querySelectorAll('.pages').forEach((page)=> {
        page.style.display = 'none';
    });
    document.querySelector('#'+pageName).style.display = 'block';
}

allPosts = document.querySelector('#AllPostsButton');

let followingButton=document.querySelector("#followingButton");

followingButton.onsubmit = ()=> {
    fetch('/following')
    .then(response => response.json())
    .then(data=>{
        loadPosts(data);
    });
    return false;
}

function loadPosts(data) {
    console.log(data);
    document.querySelector("#AllPosts").innerHTML = "";
        data.allPosts.forEach(post => {
            let thispost = document.createElement('div');
            thispost.classList.add('post');
            let userlink = document.createElement('a');
            thispost.innerHTML = `<a href="/user/${post.username}"><b>${post.username}</b></a>
                <i>${post.time}</i> <p>${post.content}</p> Likes: ${post.likecount}`;

            let likeForm = document.createElement('form');
            let likeButton = document.createElement('button');
            likeButton.classList.add('btn', 'btn-primary', 'btn-sm');
            likeButton.type='submit';
            likeButton.onclick = () => toggle(likeButton);
            if (post['liked'] === false) {
                likeButton.innerHTML='Like';
            }
            else {
                likeButton.innerHTML='Unlike';
            }
            likeForm.append(likeButton);

            let postid = document.createElement('input');
            postid.type='hidden';
            postid.name='id';
            postid.value=post['id'];
            likeForm.append(postid);

            const csrftoken = getCookie('csrftoken');

            likeForm.onsubmit = () => {
                fetch(`likePost/${post.id}`, {
                    method:"POST",
                    headers: {'X-CSRFToken':csrftoken}
                });
                thispost.innerHTML=`<b>${post.username}</b> <i>${post.time}</i> <p>${post.content}</p> Likes: ${post.likecount}`;
                return false;
            }

            thispost.append(likeForm);
            document.querySelector('#AllPosts').append(thispost);
        });
}

function pagination(pageCount) {
    if (pageCount === 0)
        return;
    let mydiv=document.querySelector('#paginatory');
    let nextButton=document.createElement('button');
    nextButton.classList.add('btn', 'btn-primary', 'btn-sm');
    let prevButton=document.createElement('button');
    prevButton.classList.add('btn', 'btn-primary', 'btn-sm');
    prevButton.innerHTML = 'Prev';
    nextButton.innerHTML = 'Next';
    mydiv.append(prevButton);
    mydiv.append(nextButton);
}