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
        pagination_buttons(data.pagecount, data.page);
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
        pagination_buttons(data.pagecount, data.page);
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
    let mydiv=document.querySelector('#paginatory');
    for (let i = 1; i <= pageCount && i<=10; i++) {
        let myform = document.createElement('form');
        myform.onsubmit= ()=> {
            fetch(`getAllPosts?page=${i}`)
            .then(response => response.json())
            .then(data => {

            loadPosts(data);
            });
            return false;
        }
        let submitbutton = document.createElement('button');
        submitbutton.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
        submitbutton.type='submit';
        submitbutton.innerHTML=i;
        myform.append(submitbutton);
        mydiv.append(myform);
    }
    mydiv.append(nextButton);
}

function pagination_buttons(pageCount, currentPage) {
    document.querySelector('#paginatory').innerHTML='';
    /*
        The commented code below implements the logic to h
    */
    /*
    if (pageCount==1) {
        return;
    }
    if (pageCount==2) {
        let myform=document.createElement('form');
        myform.onsubmit=()=> {
            let nextpage=1;
            if(currentPage==1){
                nextpage=2;
            }
            else {
                nextpage=1;
            }
            fetch(`getAllPosts?page=${nextpage}`)
            .then(response => response.json())
            .then(data => {

            loadPosts(data);
            pagination_buttons(data.pagecount, data.page);
            });
            return false;
        }
        let nextbutton=document.createElement('button');
        nextbutton.type='submit';
        nextbutton.classList.add('btn', 'btn-primary', 'btn-sm');
        if(currentPage==1){
            nextbutton.innerHTML='Next';
        }
        else {
            nextbutton.innerHTML='Prev';
        }
        myform.append(nextbutton);
        document.querySelector('#paginatory').append(myform);
    }
    if(pageCount > 2) */{
        let nextbuttonform=document.createElement('form');
        let prevbuttonform=document.createElement('form');

        let nextbutton=document.createElement('button');
        nextbutton.type='submit';
        nextbutton.classList.add('btn', 'btn-primary', 'btn-sm');
        nextbutton.innerHTML='Next';

        let prevbutton=document.createElement('button');
        prevbutton.type='submit';
        prevbutton.classList.add('btn', 'btn-primary', 'btn-sm');
        prevbutton.innerHTML='Prev';

        let paginationdiv=document.querySelector('#paginatory');
        paginationdiv.append(prevbuttonform);
        pagination(pageCount);
        paginationdiv.append(nextbuttonform);
    }
}