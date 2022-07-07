const SQLConnect = require("../mySQLconnect");

class UserManager {
    async getAllUsers() {
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query('SELECT * FROM user', function (err, data, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                });
            }
        )
    }

    async getUserByEmail(email) {
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`SELECT * FROM user WHERE email = "${email}" LIMIT 1`, function (err, data, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                });
            }
        )
    }

    async getUserData(id) {
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`SELECT * FROM user WHERE id = ${id}`, function (err, data, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                });
            }
        )
    }

    async signup(newuser) {
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`INSERT INTO user (email, password, firstname, lastname, position, isAdmin) VALUES ("${newuser.email}", "${newuser.password}", "${newuser.firstname}", "${newuser.lastname}" , "${newuser.position}", 0)`
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

    async editUser(user) {
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`UPDATE user SET firstname = "${user.firstname}", lastname = "${user.lastname}", position = "${user.position}", email = "${user.email}" WHERE id = ${user.userId}`
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

    async updateProfilePicture(user) {
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`UPDATE user SET firstname = "${user.firstname}", lastname = "${user.lastname}", position = "${user.position}", email = "${user.email}" WHERE id = ${user.userId}`
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

    async deleteUser(req) {
        let id = req.body.userId
        return new Promise(
            (resolve, reject) => {
                SQLConnect.query(`DELETE FROM user WHERE ?`, { id },
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

module.exports = UserManager