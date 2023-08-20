const express = require("express");
const AuthUser = require("../middleware/AuthUser");
const {
  createShortUrl,
  getAllUrls,
  delUrl,
} = require("../controller/UrlController");

// CREATING EXPRESS ROUTE HANDLER
const router = express.Router();

// CREATE SHORT URL POST ROUTER
router.post("/", AuthUser, createShortUrl);

// GET All URLS ROUTER
router.get("/urls", AuthUser, getAllUrls);

// DELETE A URL ROUTER
router.delete("/urls/:urlId", AuthUser, delUrl);

module.exports = router;
