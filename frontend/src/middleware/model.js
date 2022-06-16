

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

    // POSTS
    getPosts() {
        return fetch("http://localhost:3000/api/posts")
            .then((response) => response.json())
            .then((posts) => {
                return posts;
            })
            .catch(console.error);
    }

    addPost(postReq) {
        let data = JSON.stringify(postReq);
        return fetch("http://localhost:3000/api/posts", {
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

    editPost(postReq) {
        let id = postReq.id
        let data = JSON.stringify(postReq);
        return fetch("http://localhost:3000/api/posts/" + id, {
            method: "PUT",
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

    deletePost(postId) {
        let req = { id: postId }
        let data = JSON.stringify(req);
        return fetch("http://localhost:3000/api/posts", {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
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
        let data = JSON.stringify(commentReq);
        return fetch("http://localhost:3000/api/comments", {
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

    editComment(commentReq) {
        let id = commentReq.id
        let data = JSON.stringify(commentReq);
        return fetch("http://localhost:3000/api/comments/" + id, {
            method: "PUT",
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

    deleteComment(commentId) {
        let req = { id: commentId }
        let data = JSON.stringify(req);
        return fetch("http://localhost:3000/api/comments", {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: data,
        })
            .catch(console.error);
    }
}