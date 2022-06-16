const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/userController")
const postCtrl = require("../controllers/postController")
const commentCtrl = require("../controllers/commentController")


//ROUTES
//users
router.get("/api/users", userCtrl.getUsers)
router.get("/api/users/:id", userCtrl.getUserInfo)

//posts
router.get("/api/posts", postCtrl.getPosts)
router.post("/api/posts", postCtrl.addPost)
router.put("/api/posts/:id", postCtrl.editPost)
router.delete("/api/posts", postCtrl.deletePost)

//comments
router.get("/api/comments/:id", commentCtrl.getComments)
router.post("/api/comments", commentCtrl.addComment)
router.delete("/api/comments", commentCtrl.deleteComment)
router.put("/api/comments/:id", commentCtrl.editComment)

module.exports = router;