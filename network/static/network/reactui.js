function CreatePost(props) {
    return (
        <div class="post">
            {props.username} posted {props.content} at {props.time}
        </div>
    );
}

function loadPage(pageName) {
    document.querySelectorAll('.pages').forEach((page)=> {
        page.style.display = 'none';
    });
    document.querySelector('#'+pageName).style.display = 'block';
}

function AllPosts(props) {
    loadPage('AllPosts2');

    const [allPosts, setAllPosts] = React.useState(0)
    
    fetch('/getAllPosts')
    .then(response => response.json())
    .then(data => {
        console.log('i reached here');
    });
    return (
            <p>{allPosts}</p>
    )
}

ReactDOM.render(<AllPosts />, document.querySelector('#AllPosts2'));