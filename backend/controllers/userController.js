const UserManager = require("../managers/UserManager")

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

exports.getUserInfo = (req, res, next) => {
    let userManager = new UserManager
    userManager.getUserInfo(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}
