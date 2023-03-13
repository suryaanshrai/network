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
    fetch('getAllPosts')
    .then(response => response.json())
    .then(data => {
      console.log(data, 'posted');
      const [state, setState] = React.useState({
        data: data
      });
      console.log(state.data, 'from state');
    });
    return(
      <div>Shit yaar!</div>
    )
}

ReactDOM.render(<AllPosts />, document.querySelector('#AllPosts2'));