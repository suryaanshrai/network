function LikePost(id) {
    fetch(`/likepost/${id}`, {
        method: 'POST',
        body: new FormData(document.querySelector(`${id}form`))
    })
}