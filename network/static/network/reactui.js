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
    const [state, setState] = React.useState({
      data: {}
    });
    fetch('getAllPosts')
    .then(response => response.json())
    .then(data => {
      console.log(data, 'posted');
      setState({
        data: data
      })
    });
    return(
      <div>{JSON.stringify(state.data)}</div>
    )
}

