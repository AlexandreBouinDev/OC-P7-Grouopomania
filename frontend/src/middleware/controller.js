import Model from "./model.js"
let model = new Model();

export default class Controller {

    //GETS 
    async getPosts() {
        let posts = await model.getPosts()
        return posts
    }

    async getUserLikes(userId) {
        let likes = await model.getUserLikes(userId)
        return likes
    }

    async getUserPosts(userId) {
        let posts = await model.getUserPosts(userId)
        return posts
    }

    async getUsers() {
        let users = await model.getUsers()
        return users
    }

    async getUserData(userId) {
        let user = await model.getUserData(userId)
        return user
    }

    async getComments(postId) {
        let comments = await model.getComments(postId)
        return comments
    }

    //USERS
    addUser(newUser) {
        model.addUser(newUser)
    }

    async login(user) {
        return model.login(user).then(data => data)
    }

    editProfile(user) {
        return model.editProfile(user)
    }

    updateProfilePicture(file, userId) {
        return model.updateProfilePicture(file, userId)
    }

    deleteProfile(user) {
        return model.deleteProfile(user)
    }



    //POSTS
    async addPost(postReq, img) {
        let userId = localStorage.getItem("userId")
        postReq.userId = userId;
        const formData = new FormData()
        formData.append("postReq", JSON.stringify(postReq))
        formData.append("image", img)
        await model.addPost(formData)
    }
    editPost(postReq) {
        postReq = { ...postReq }
        model.editPost(postReq).then(data => {
            return data
        })
    }
    deletePost(postId) {
        model.deletePost(postId)
    }

    likePost(data) {
        model.likePost(data)
    }




    // COMMENTS
    async addComment(commentReq) {
        let userId = localStorage.getItem("userId")
        commentReq.userId = userId
        await model.addComment(commentReq)

    }
    editComment(commentReq) {
        commentReq = { ...commentReq, userId: 3 }
        model.editComment(commentReq)
    }
    deleteComment(commentId) {
        model.deleteComment(commentId)
    }
}