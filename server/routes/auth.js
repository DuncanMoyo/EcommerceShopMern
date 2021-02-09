const express = require("express");

const router = express.Router();

//import controller
const { createOrUpdateUser } = require("../controllers/auth");

// import middlewares
const { authCheck } = require("../middlewares/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;
