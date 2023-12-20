const express = require("express");

const ValidateToken =  require("../Handler/authHandler");

const router = express.Router();

const {
    fetchingusers,
    fetchingAuthentic,
    fetchingById,
    update,
    deletec,
    create
} = require("../Controller/fetchingData")

router.use(ValidateToken)

router.route("/allusers").get(fetchingusers);

router.route("/all").get(fetchingAuthentic);

router.route("/all/:id").get(fetchingById);

router.route("/update/:id").put(update);

router.route("/create").post(create);

router.route("/delete/:id").delete(deletec);

module.exports = router