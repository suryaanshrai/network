function LikePost(id) {
    fetch(`/likepost/${id}`, {
        method: 'POST',
        body: new FormData(document.querySelector(`${id}form`))
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}