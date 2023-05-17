const express = require("express");
const { signup, login, getUser } = require("../controller/AppController");
const AuthUser = require("../middleware/AuthUser");

// creating express route handler
const router = express.Router();

// SIGN-UP POST ROUTER
router.post("/signup", signup);

// LOGIN POST ROUTER
router.post("/login", login);

// GET USER ROUTER
router.get("/", AuthUser, getUser);

module.exports = router;
