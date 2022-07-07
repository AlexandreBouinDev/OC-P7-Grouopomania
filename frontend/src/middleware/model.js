export default class Model {


    // USERS
    getUsers() {
        return fetch("http://localhost:3000/api/users")
            .then((response) => response.json())
            .then((users) => {
                return users;
            })
            .catch(console.error);
    }

    getUserData(userId) {
        return fetch("http://localhost:3000/api/users/" + userId)
            .then((response) => response.json())
            .then((user) => {
                return user;
            })
            .catch(console.error);
    }

    addUser(newUser) {
        let data = JSON.stringify(newUser);
        return fetch("http://localhost:3000/api/users/signup", {
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
        return fetch("http://localhost:3000/api/users/login", {
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
        return fetch("http://localhost:3000/api/users/edit", {
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
        console.log(image)
        let token = localStorage.getItem("token")
        let formData = new FormData()
        formData.append("file", "file",)
        console.log(formData)
        return fetch("http://localhost:3000/api/users/updateProfilePicture/" + userId, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data",
                "Content-Length": "14580053",
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
        return fetch("http://localhost:3000/api/users/delete", {
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
        return fetch("http://localhost:3000/api/posts")
            .then((response) => response.json())
            .then((posts) => {
                return posts;
            })
            .catch(console.error);
    }

    getUserPosts(userId) {
        return fetch("http://localhost:3000/api/posts/" + userId)
            .then((response) => response.json())
            .then((posts) => {
                return posts;
            })
            .catch(console.error);
    }

    addPost(postReq) {
        let token = localStorage.getItem("token")
        let data = JSON.stringify(postReq);
        return fetch("http://localhost:3000/api/posts", {
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

    editPost(postReq) {
        let token = localStorage.getItem("token")
        let data = JSON.stringify(postReq);
        return fetch("http://localhost:3000/api/posts/", {
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
        return fetch("http://localhost:3000/api/posts", {
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

    // COMMENTS
    getComments(postId) {
        return fetch("http://localhost:3000/api/comments/" + postId)
            .then((response) => response.json())
            .then((users) => {
                return users;
            })
            .catch(console.error);
    }

    addComment(commentReq) {
        let token = localStorage.getItem("token")
        let data = JSON.stringify(commentReq);
        return fetch("http://localhost:3000/api/comments", {
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
        return fetch("http://localhost:3000/api/comments/" + id, {
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
        return fetch("http://localhost:3000/api/comments", {
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