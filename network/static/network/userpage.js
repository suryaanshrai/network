function LikePost(id,csrftoken) {
    fetch(`likePost/${post.id}`, {
        method:"POST",
        headers: {'X-CSRFToken':csrftoken}
    })
    .then(likereponse=>likereponse.json())
    .then(likedata => {
        console.log(likedata);
        document.querySelector(`#post${post.id}`).innerHTML = `Likes: ${likedata.newlikecount}`;
    })
    return false;
}