document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postsSection = document.getElementById('posts');

    // Function to get posts from local storage
    function getPosts() {
        const posts = localStorage.getItem('posts');
        return posts ? JSON.parse(posts) : [];
    }

    // Function to save posts to local storage
    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Function to render posts
    function renderPosts() {
        const posts = getPosts();
        postsSection.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            const postTitle = document.createElement('h2');
            postTitle.textContent = post.title;

            const postContent = document.createElement('p');
            postContent.textContent = post.content;

            const postActions = document.createElement('div');
            postActions.className = 'post-actions';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editPost(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deletePost(index));

            postActions.appendChild(editButton);
            postActions.appendChild(deleteButton);

            postElement.appendChild(postTitle);
            postElement.appendChild(postContent);
            postElement.appendChild(postActions);
            postsSection.appendChild(postElement);
        });
    }

    // Handle form submission
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const newPost = { title, content };
        const posts = getPosts();
        posts.push(newPost);
        savePosts(posts);
        renderPosts();

        // Clear the form
        postForm.reset();
    });

    // Edit post
    function editPost(index) {
        const posts = getPosts();
        const post = posts[index];

        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;

        posts.splice(index, 1);
        savePosts(posts);
        renderPosts();
    }

    // Delete post
    function deletePost(index) {
        const posts = getPosts();
        posts.splice(index, 1);
        savePosts(posts);
        renderPosts();
    }

    // Initial render
    renderPosts();
});
