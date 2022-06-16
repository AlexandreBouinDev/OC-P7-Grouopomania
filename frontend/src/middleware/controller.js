import Model from "./model.js"
let model = new Model();

export default class Controller {

    //GETS 
    async getPosts() {
        let posts = await model.getPosts()
        return posts
    }

    async getUsers() {
        let users = await model.getUsers()
        return users
    }

    async getComments(postId) {
        let comments = await model.getComments(postId)
        return comments
    }


    //POSTS
    addPost(postReq) {
        postReq = { ...postReq, userId: 3, img: null }
        model.addPost(postReq)
    }
    editPost(postReq) {
        postReq = { ...postReq, userId: 3 }
        model.editPost(postReq)
    }
    deletePost(postId) {
        model.deletePost(postId)
    }


    // COMMENTS
    addComment(commentReq) {
        commentReq = { ...commentReq, userId: 3 }
        model.addComment(commentReq)

    }
    editComment(commentReq) {
        commentReq = { ...commentReq, userId: 3 }
        model.editComment(commentReq)
    }
    deleteComment(commentId) {
        model.deleteComment(commentId)
    }
}