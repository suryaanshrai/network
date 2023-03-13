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
        var allPosts = data;
        console.log(data, 'posted');
    });
    //console.log(allPosts, 'posted through react');
    return (
        <div>
            <p>Loading React...</p>
            {this.state.allPosts}
        </div>
    );
}

ReactDOM.render(<AllPosts />, document.querySelector('#AllPosts2'));