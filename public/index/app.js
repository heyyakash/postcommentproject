
// function to fetch posts
const fetchPosts = async () => {
    const response = await fetch("/post")
    const data = await response.json()
    const { posts } = data
    console.log(posts)
    posts.reverse().map((x, i) => {
        container = createPostElement(x)
        root.appendChild(container)
    })

}

// function to get user details
const getUserDetails = async () => {
    const res = await fetch('/auth/details')
    if (res.status === 200) {
        const result = await res.json()
        userpanel.innerHTML = `<img src="${result.user.image}" class="rounded-full h-10 w-10 object-cover" alt="avatar">${result.user.name} <i onclick = "logout()" class="ri-logout-box-r-line cursor-pointer"></i>`
    }
}

// function to logout
const logout = async () => {
    await fetch("/auth/logout", {
        method: "POST"
    })
    window.location.reload()
}

// function to get date out of dateString
const getdateString = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    return `${day}/${month}/${year}`
}

// function to append post element to the ui
const createPostElement = (post) => {
    const container = document.createElement('div')
    container.classList.add('flex', 'flex-col', 'p-4', 'gap-2', 'border-b-2', 'border-slate-700')

    const authorInfo = document.createElement('p')
    authorInfo.classList.add('text-lg', 'font-semibold', 'flex', 'items-center', 'gap-2')
    const dateString = getdateString(post.createdAt)
    authorInfo.innerHTML = `<img src="${post.author.image}" class="rounded-full h-10 w-10 object-cover" alt="avatar">${post.author.name} posted <p class = "ml-auto">${dateString}</p>`
    container.appendChild(authorInfo)

    // append content
    const content = document.createElement('div')
    content.textContent = post.content
    container.append(content)

    // comment form
    const commentForm = document.createElement('form')
    commentForm.id = 'commentForm';
    commentForm.classList.add('flex', 'gap-2', 'mt-2')
    commentForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formdata = new FormData(this)
        const comment = formdata.get("comment")
        const payload = {
            comment,
            id: post._id
        }
        const res = await fetch('/comment/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (res.status === 200) {
            window.location.reload()
        } else {
            window.location.href = "/login"
        }
    })
    commentForm.innerHTML = `
        <input type="text" required placeholder="Comment something..." name="comment" id="comment"
            class="w-full bg-transparent border-2 border-slate-700 p-2 text-lg font-medium" />
        <button type="submit" class="bg-indigo-400 w-[50px]"><i class="ri-send-plane-fill"></i></button>`
    container.appendChild(commentForm)

    // create comment section
    const commentsSection = document.createElement('div');
    commentsSection.classList.add('flex', 'flex-col', 'gap-2');
    const commentsTitle = document.createElement('p');
    commentsTitle.classList.add('text-lg', 'font-semibold', 'mb-2');
    commentsTitle.textContent = 'Comments';
    commentsSection.appendChild(commentsTitle);
    container.appendChild(commentsSection);

    post.comments.forEach(comment => {
        const commentContainer = document.createElement('div')
        commentContainer.classList.add('flex', 'flex-col', 'gap-2')
        const commentAuthor = document.createElement('p');
        commentAuthor.classList.add('text-lg', 'font-semibold', 'flex', 'items-center', 'gap-2')
        const dateString = getdateString(comment.createdAt)
        commentAuthor.innerHTML = `<img src="${comment.author.image}" class="rounded-full h-10 w-10 object-cover" alt="avatar"> ${comment.author.name} commented <p class = "ml-auto">${dateString}</p>`
        commentContainer.appendChild(commentAuthor)

        const commentContent = document.createElement('div')
        commentContent.textContent = comment.text
        commentContainer.appendChild(commentContent)

        commentsSection.appendChild(commentContainer)
    })

    container.appendChild(commentsSection)

    return container
}

// function to create a new post
const form = document.getElementById("post-form")
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const formdata = new FormData(this)
    const payload = {
        content: formdata.get("post")
    }
    const res = await fetch('/post/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (res.status === 200) {
        window.location.reload()
    } else if (res.status == 401) {
        window.location.href = "/login"
    } else {
        console.error('Error:', res.statusText)
    }
})


fetchPosts()
getUserDetails()
const userpanel = document.getElementById("user")
const root = document.getElementById("root")

