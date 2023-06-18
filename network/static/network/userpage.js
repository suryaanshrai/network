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

function toggle(button) {
    if (button.innerHTML === 'Like') {
        button.innerHTML = 'Unlike';
    } else {
        button.innerHTML = 'Like';
    }
}

function LikePost(id) {

    const csrftoken = getCookie('csrftoken');

    fetch(`/likePost/${id}`, {
            method: "POST",
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(likereponse => likereponse.json())
        .then(likedata => {
            console.log(likedata);
            document.querySelector(`#post${id}`).innerHTML = `Likes: ${likedata.newlikecount}`;
            let likebutton = document.querySelector(`#button${id}`);
            if (likedata.likestatus == "liked") {
                likebutton.innerHTML = "Unlike";
            } else {
                likebutton.innerHTML = "Like";
            }
        })
    return false;
}

function editpost(id) {
    document.querySelector(`#toHide${id}`).style.display="none";
    document.querySelector(`#editButton${id}`).style.display="none";
    document.querySelector(`#editText${id}`).style.display="block";
    document.querySelector(`#editForm${id}`).style.display="block";
}

function editPostSubmit(id) {
    document.querySelector(`#toHide${id}`).style.display="none";
    document.querySelector(`#editButton${id}`).style.display="none";
    document.querySelector(`#editText${id}`).style.display="block";
    fetch(`/editpost/${id}`, {
        method:"POST",
        body: new FormData(editForm),
    })
    .then(editresponse => editresponse.json())
    .then(editdata => {
        console.log(editdata);
    })
}