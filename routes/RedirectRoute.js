const express = require("express");
const { redirect } = require("../controller/RedirectController");

// creating express route handler
const router = express.Router();

// HANDLE REDIRECT GET ROUTER
router.get("/url/:code", redirect);

module.exports = router;
