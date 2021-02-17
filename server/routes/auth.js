const express = require("express");

const router = express.Router();

//import controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

// import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// routes
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
