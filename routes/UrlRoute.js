const express = require("express");
const AuthUser = require("../middleware/AuthUser");
const { createShortUrl } = require("../controller/UrlController");

// creating express route handler
const router = express.Router();

router.post("/", AuthUser, createShortUrl);

module.exports = router;
