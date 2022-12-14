const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require("../middleware/multer-config")

const userCtrl = require("../controllers/userController")
const postCtrl = require("../controllers/postController")
const commentCtrl = require("../controllers/commentController")


//ROUTES
//users
router.get("/api/users", userCtrl.getUsers)
router.get("/api/users/:id", userCtrl.getUserData)
router.post('/api/users/signup', userCtrl.signup)
router.post('/api/users/login', userCtrl.login)
router.put('/api/users/edit', auth, userCtrl.editUser)
router.post('/api/users/updateProfilePicture/:id', auth, multer, userCtrl.updateProfilePicture)
router.delete('/api/users/delete', auth, userCtrl.deleteUser)

//posts
router.get("/api/posts", postCtrl.getPosts)
router.post("/api/posts", auth, multer, postCtrl.addPost)
router.put("/api/posts", auth, postCtrl.editPost)
router.delete("/api/posts", auth, postCtrl.deletePost)
router.get("/api/posts/:id", postCtrl.getUserPosts)
router.post("/api/posts/like", auth, postCtrl.likePost)
router.get("/api/posts/like/:id", postCtrl.getUserLikes)

//comments
router.get("/api/comments/:id", commentCtrl.getComments)
router.post("/api/comments", auth, commentCtrl.addComment)
router.delete("/api/comments", auth, commentCtrl.deleteComment)
router.put("/api/comments/:id", auth, commentCtrl.editComment)

module.exports = router;