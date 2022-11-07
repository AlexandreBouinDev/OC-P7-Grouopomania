const SQLConnect = require("../mySQLconnect");

class PostManager {
    async getAllPosts() {
        return new Promise(
            (resolve, reject) => {

                SQLConnect.query('SELECT * FROM post ORDER BY id DESC', function (err, data, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                });
            }
        )
    }

    async getUserPosts(userId) {
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`SELECT * FROM post WHERE userId = ? ORDER BY id DESC `, userId, function (err, data, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                });
            }
        )
    }


    async addPost(req) {
        let data = req.body
        let post = JSON.parse(data.postReq)
        let imgUrl = null
        if (req.file) {
            imgUrl = req.file.filename
        }
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`INSERT INTO post (content, title, userId, img, creationDate) VALUES ( ? , ? , ? , ? , now())`, [post.content, post.title, post.userId, imgUrl]
                    , function (err, data, fields) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    });
            }
        )
    }

    async editPost(req) {
        let post = req.body
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`UPDATE post SET content = ?, title = ?, creationDate = now() WHERE id = ?`, [post.content, post.title, post.id]
                    , function (err, data, fields) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    });
            }
        )
    }

    async deletePost(req) {
        let id = req.body.id
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`DELETE FROM post WHERE ?`, { id },
                    function (err, data, fields) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    });
            }
        )
    }

    async likePost(req) {
        let userId = req.body.userId
        let postId = req.body.postId
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`SELECT * FROM likepost WHERE userId=? AND postId=?`, [userId, postId],
                    function (err, data, fields) {
                        if (data.length != 0) {
                            SQLConnect.query(`DELETE FROM likepost WHERE userId=? AND postId=?`, [userId, postId],
                                function (err, data, fields) {
                                    if (err) {
                                        reject(err)
                                    }
                                })
                        } else {
                            SQLConnect.query(`INSERT INTO likepost (userId, postId) VALUES (?, ?)`, [userId, postId],
                                function (err, data, fields) {
                                    if (err) {
                                        reject(err)
                                    }
                                })
                        }
                    });
            }
        )
    }

    async getUserLikes(req) {
        let userId = req.params.id
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`SELECT * FROM likepost WHERE userId = ?`, userId, function (err, data, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                });
            }
        )
    }
}


module.exports = PostManager