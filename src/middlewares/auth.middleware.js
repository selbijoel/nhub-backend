const {UserModel} = require("../models/user.model");

async function checkAdmin(req, res, next) {
    const user = await UserModel.findOne({username: req.body.username});

    if (!user || user.role !== "ADMIN") return res.send("Permission denied!").end();

    next();
}

module.exports = {
    checkAdmin
}

