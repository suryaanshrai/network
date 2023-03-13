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

    fetch('/getAllPosts')
    .then(response => response.json())
    .then(data => {
        const [allPosts, setAllPosts] = React.useState({
            'allposts':data
        });
        console.log('i reached here');
    });
    return (
            <p>{allPosts.allposts}</p>
    )
}

ReactDOM.render(<AllPosts />, document.querySelector('#AllPosts2'));