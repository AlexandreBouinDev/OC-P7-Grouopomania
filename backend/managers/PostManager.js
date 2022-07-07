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
                SQLConnect.query(`SELECT * FROM post WHERE userId = ${userId} ORDER BY id DESC `, function (err, data, fields) {
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
        let post = req.body
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`INSERT INTO post (content, title, userId, img, creationDate) VALUES ("${post.content}", "${post.title}", ${post.userId}, "${post.img}", now())`
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
                SQLConnect.query(`UPDATE post SET content = "${post.content}", title = "${post.title}", creationDate = now() WHERE id = ${post.id}`
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
}

module.exports = PostManager