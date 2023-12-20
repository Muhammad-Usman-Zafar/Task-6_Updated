// libraries Imported
const express = require("express");

const validateToken = require('../Handler/authHandler')

const router = express.Router();

const { register, login, current } = require("../Controller/UserRoute")

//------------Routes Starts fro here-----------------

// Register Route
router.route("/register").post(register);

//------------LOGIN--------------

router.route("/login").post(login);

router.route('/current').get(validateToken, current)

module.exports = router