const express = require("express");
const { signup, login, getUserData } = require("../controller/AppController");
const AuthUser = require("../middleware/AuthUser");

// creating express route handler
const router = express.Router();

// SIGN-UP POST ROUTER
router.post("/signup", signup);

// LOGIN POST ROUTER
router.post("/login", login);

// GET USER DATA ROUTER
router.get("/", AuthUser, getUserData);

module.exports = router;
