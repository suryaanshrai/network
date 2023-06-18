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

let edit = document.createElement('div');
                let editButton = document.createElement('button');
                let editSubmit = document.createElement('button');
                let editText = document.createElement('textarea');
                let editForm = document.createElement('form');

                editText.style.display = "none";
                editText.name="post_content";
                editButton.innerHTML="Edit";
                editButton.onclick=()=> {
                    editText.style.display="block";
                    editSubmit.style.display="block";
                    editButton.style.display="none";
                    editText.innerHTML=post.content;
                    document.querySelector(`#toHide${post.id}`).style.display="none";
                    likeForm.style.display="none";
                }

                editButton.classList.add('btn', 'btn-primary', 'btn-sm');
                editSubmit.classList.add('btn', 'btn-primary', 'btn-sm');
                editSubmit.style.display="none";
                editSubmit.innerHTML="Done";
                editForm.onsubmit=()=> {
                    return false;
                }
                editSubmit.onclick= () => {
                    fetch(`/editpost/${post.id}`, {
                        method:"POST",
                        body: new FormData(editForm),
                        headers: {
                            'X-CSRFToken': csrftoken
                        }
                    })
                    .then(editresponse => editresponse.json())
                    .then(editdata => {
                        console.log(editdata);
                        document.querySelector(`#toupdate${post.id}`).innerHTML=editdata.post_content;
                        editText.style.display="none";
                        editSubmit.style.display="none";
                        editButton.style.display="block";
                        document.querySelector(`#toHide${post.id}`).style.display="block";
                        likeForm.style.display="block";
                    });
                    return false;
                }
                editForm.append(editText, editSubmit);
                edit.append(editButton,editForm);
                thispost.append(likeForm);
                let user_id=document.querySelector("#userid").value;
                if (post.poster_id == user_id) {
                    thispost.append(edit);
                }