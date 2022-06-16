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

    async getUserInfo(id) {
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
}

module.exports = UserManager