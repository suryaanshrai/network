function LikePost(id) {
    console.log("Happy Me");
    fetch(`likePost/${id}`, {
        method: 'POST',
        body: new FormData(document.querySelector(`#${id}form`))
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
    return false;
}