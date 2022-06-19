const newPost = document.getElementById("new-post")
const blogList = document.getElementById("blog-list")
const blogCont = document.getElementById("blog-cont")
let title = document.querySelector('#title')
let postTitle = document.getElementById("title")
let postBody = document.getElementById("content")
let body = document.querySelector('#body')
let postsArr = []

function renderPosts() {
    blogList.innerHTML = ``
    postsArr.map(post => {
        blogList.innerHTML += `
            <div class="post">
                <p>${post.id}</p>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-success" id="view-btn" onclick="viewedPost(${post.id})">View</button>
                    <button class="btn btn-primary" onclick="updatePost(${post.id})">Update</button>
                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                </div>
            </div>
        ` 
    })
}

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        postsArr = data.slice(0, 5)
        renderPosts() 
    })

newPost.addEventListener("submit", function(e) {
    e.preventDefault()
    
    const postData = {
        title: postTitle.value,
        body: postBody.value
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(post => {
            postsArr.unshift(post)
            renderPosts()
            newPost.reset()
        })
})


function updatePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: postTitle.value,
            body: postBody.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            let blogTitle = document.querySelectorAll('.blog-titles') 
            let blogBodies = document.querySelectorAll('.blog-body')
            console.log(blogTitle)
            blogTitle.forEach((blogTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        blogTitle.innerHTML = data.title
                    }
                }

            })

            blogBodies.forEach((blogBody, index) => {
                if (index + 1 === id) {
                    if (data.content !== "") {
                        blogBody.innerHTML = data.content
                    }
                }

            })

        });
}

function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'indexTwo.html'
            console.log(data)
        });
}

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            postsArr = postsArr.filter(blog => blog.id !== id)
            console.log(postsArr)
            // use a function to display the UI
            renderUI(postsArr)  
        })

}

function renderUI (arr) {
    let blogContainer = '';
            arr.forEach(blog => {
                blogContainer += `
                <div class="post">
                    <p>${post.id}</p>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-success" id="view-btn" onclick="viewedPost(${post.id})">View</button>
                        <button class="btn btn-primary" onclick="updatePost(${post.id})">Update</button>
                        <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                    </div>
               </div>
                `
            });
            blogCont.innerHTML = blogContainer;

 }
