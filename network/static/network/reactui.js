function CreatePost(props){
    return (
        <div class="post">
            {props.username} posted {props.content} at {props.time}
        </div>
    );
}

function AllPosts() {
    fetch("getAllPosts")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let solution=document.createElement('div');
    });
    return (
        <div></div>
    );
}

