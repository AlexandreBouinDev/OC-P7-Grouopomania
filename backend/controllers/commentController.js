const CommentManager = require("../managers/CommentManager")

exports.getComments = (req, res, next) => {
    let commentManager = new CommentManager
    let postId = req.params.id
    commentManager.getPostComments(postId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.addComment = (req, res, next) => {
    let commentManager = new CommentManager
    commentManager.addComment(req)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.editComment = (req, res, next) => {
    let commentManager = new CommentManager
    commentManager.editComment(req)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.deleteComment = (req, res, next) => {
    let commentManager = new CommentManager
    commentManager.deleteComment(req)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

