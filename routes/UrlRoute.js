const express = require("express");
const AuthUser = require("../middleware/AuthUser");
const { createShortUrl, getAllUrls } = require("../controller/UrlController");

// creating express route handler
const router = express.Router();

// CREATE SHORT URL POST ROUTER
router.post("/", AuthUser, createShortUrl);

// GET All URLS ROUTER
router.get("/urls", AuthUser, getAllUrls);

module.exports = router;
