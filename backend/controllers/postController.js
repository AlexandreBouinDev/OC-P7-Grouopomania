const PostManager = require("../managers/PostManager")

exports.getPosts = (req, res, next) => {
    let postManager = new PostManager
    postManager.getAllPosts()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.getUserPosts = (req, res, next) => {
    let userId = req.params.id
    let postManager = new PostManager
    postManager.getUserPosts(userId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.addPost = (req, res, next) => {
    let postManager = new PostManager
    postManager.addPost(req)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.editPost = (req, res, next) => {
    let postManager = new PostManager
    postManager.editPost(req)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.deletePost = (req, res, next) => {
    let postManager = new PostManager
    postManager.deletePost(req)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.likePost = (req, res, next) => {
    let postManager = new PostManager
    postManager.likePost(req)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.getUserLikes = (req, res, next) => {
    let postManager = new PostManager
    postManager.getUserLikes(req)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}