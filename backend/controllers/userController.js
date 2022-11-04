const UserManager = require("../managers/UserManager")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const randomTokenSecret = process.env.TOKEN

exports.getUsers = (req, res, next) => {
    let userManager = new UserManager
    userManager.getAllUsers()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.getUserData = (req, res, next) => {
    let userManager = new UserManager
    userManager.getUserData(req.params.id)
        .then(response => {
            delete response[0].password
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.signup = (req, res, next) => {
    let userManager = new UserManager
    let newuser = req.body
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            newuser = {
                ...newuser,
                password: hash

            }
            userManager.signup(newuser)
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.login = (req, res, next) => {
    let userManager = new UserManager
    let reqUser = req.body
    userManager.getUserByEmail(reqUser.email)
        .then(DBUser => {
            let userData = DBUser[0]
            console.log(userData)
            if (!userData) {
                return res.status(401).json({ error: 'Utilisateur introuvable !' });
            }
            bcrypt.compare(reqUser.password, userData.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: userData.id,
                        isAdmin: userData.isAdmin,
                        token: jwt.sign(
                            { userId: userData.id },
                            randomTokenSecret,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.editUser = (req, res, next) => {
    if (res.locals.userId == req.body.userId) {
        let userManager = new UserManager
        userManager.editUser(req.body)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    } else {
        return res.status(401).json({
            error: "L'utilisateur ne correspond pas"
        })
    }
}

exports.updateProfilePicture = (req, res, next) => {
    if (res.locals.userId == req.params.id) {
        let userManager = new UserManager
        userManager.updateProfilePicture(req.file.filename, req.params.id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    } else {
        return res.status(401).json({
            error: "L'utilisateur ne correspond pas"
        })
    }
}

exports.deleteUser = (req, res, next) => {
    if (res.locals.userId == req.body.userId) {
        let userManager = new UserManager
        userManager.deleteUser(req)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    } else {
        return res.status(401).json({
            error: "L'utilisateur ne correspond pas"
        })
    }
}