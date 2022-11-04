const path = process.env.VUE_APP_BACKPATH

export default class Model {

    // USERS
    getUsers() {
        return fetch(`${path}/api/users`)
            .then((response) => response.json())
            .then((users) => {
                return users;
            })
            .catch(console.error);
    }

    getUserData(userId) {
        return fetch(`${path}/api/users/` + userId)
            .then((response) => response.json())
            .then((user) => {
                return user;
            })
            .catch(console.error);
    }

    addUser(newUser) {
        let data = JSON.stringify(newUser);
        return fetch(`${path}/api/users/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(console.error);
    }

    login(user) {
        let data = JSON.stringify(user);
        return fetch(`${path}/api/users/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("token", data.token)
                localStorage.setItem("userId", data.userId)
                localStorage.setItem("isAdmin", data.isAdmin)
                return data
            })
            .catch(console.error);
    }

    editProfile(userReq) {
        let token = localStorage.getItem("token")
        let data = JSON.stringify(userReq);
        return fetch(`${path}/api/users/edit`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(console.error);
    }

    updateProfilePicture(image, userId) {
        let token = localStorage.getItem("token")
        let formData = new FormData()
        formData.append("image", image)
        return fetch(`${path}/api/users/updateProfilePicture/` + userId, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(console.error);
    }

    deleteProfile(user) {
        let token = localStorage.getItem("token")
        let data = JSON.stringify(user);
        return fetch(`${path}/api/users/delete`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: data,
        })
            .catch(console.error);
    }

    // POSTS
    getPosts() {
        return fetch(`${path}/api/posts`)
            .then((response) => response.json())
            .then((posts) => {
                return posts;
            })
            .catch(console.error);
    }

    getUserPosts(userId) {
        return fetch(`${path}/api/posts/` + userId)
            .then((response) => response.json())
            .then((posts) => {
                return posts;
            })
            .catch(console.error);
    }

    addPost(formData) {
        let token = localStorage.getItem("token")
        return fetch(`${path}/api/posts`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(console.error);
    }

    editPost(postReq) {
        let token = localStorage.getItem("token")
        let data = JSON.stringify(postReq);
        return fetch(`${path}/api/posts`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(console.error);
    }

    deletePost(postId) {
        let token = localStorage.getItem("token")
        let req = { id: postId }
        let data = JSON.stringify(req);
        return fetch(`${path}/api/posts`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: data,
        })
            .catch(console.error);
    }

    likePost(data) {
        let token = localStorage.getItem("token")
        let req = JSON.stringify(data);
        return fetch(`${path}/api/posts/like`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: req,
        })
            .catch(console.error);
    }

    getUserLikes(userId) {
        return fetch(`${path}/api/posts/like/` + userId)
            .then((response) => response.json())
            .then((likes) => {
                return likes;
            })
            .catch(console.error);
    }

    // COMMENTS
    getComments(postId) {
        return fetch(`${path}/api/comments/` + postId)
            .then((response) => response.json())
            .then((users) => {
                return users;
            })
            .catch(console.error);
    }

    addComment(commentReq) {
        let token = localStorage.getItem("token")
        let data = JSON.stringify(commentReq);
        return fetch(`${path}/api/comments`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(console.error);
    }

    editComment(commentReq) {
        let token = localStorage.getItem("token")
        let id = commentReq.id
        let data = JSON.stringify(commentReq);
        return fetch(`${path}/api/comments/` + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(console.error);
    }

    deleteComment(commentId) {
        let token = localStorage.getItem("token")
        let req = { id: commentId }
        let data = JSON.stringify(req);
        return fetch(`${path}/api/comments`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: data,
        })
            .catch(console.error);
    }
}