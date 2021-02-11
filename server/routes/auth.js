const express = require("express");

const router = express.Router();

//import controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

// import middlewares
const { authCheck } = require("../middlewares/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/currentUser", authCheck, currentUser);

module.exports = router;
