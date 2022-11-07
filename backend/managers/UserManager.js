const SQLConnect = require("../mySQLconnect");

class UserManager {
  async getAllUsers() {
    return new Promise((resolve, reject) => {
      SQLConnect.query("SELECT * FROM user", function (err, data, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      SQLConnect.query(
        `SELECT * FROM user WHERE email = ? LIMIT 1`,
        email,
        function (err, data, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  async getUserData(id) {
    return new Promise((resolve, reject) => {
      SQLConnect.query(
        `SELECT * FROM user WHERE id = ?`,
        id,
        function (err, data, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  async signup(newuser) {
    return new Promise((resolve, reject) => {
      SQLConnect.query(
        `INSERT INTO user (email, password, firstname, lastname, position, isAdmin) VALUES ( ? , ? , ? , ? , ? , 0)`,
        [
          newuser.email,
          newuser.password,
          newuser.firstname,
          newuser.lastname,
          newuser.position
        ],
        function (err, data, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  async editUser(user) {
    return new Promise((resolve, reject) => {
      SQLConnect.query(
        `UPDATE user SET firstname = ?, lastname = ?, position = ?, email = ? WHERE id = ?`,
        [user.firstname, user.lastname, user.position, user.email, user.userId],
        function (err, data, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  async updateProfilePicture(imageUrl, userId) {
    return new Promise((resolve, reject) => {
      SQLConnect.query(
        `UPDATE user SET avatar = ? WHERE id = ?`,
        [imageUrl, userId],
        function (err, data, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  async deleteUser(req) {
    let id = req.body.userId;
    return new Promise((resolve, reject) => {
      SQLConnect.query(
        `DELETE FROM user WHERE ?`,
        { id },
        function (err, data, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}

module.exports = UserManager;
