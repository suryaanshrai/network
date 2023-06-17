function LikePost(id) {
    fetch(`likePost/${id}`, {
        method: 'POST',
        body: new FormData(document.querySelector(`${id}form`))
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
    return false;
}