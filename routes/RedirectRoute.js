const express = require("express");
const { redirect } = require("../controller/RedirectController");

// CREATING EXPRESS ROUTE HANDLER
const router = express.Router();

// HANDLE REDIRECT GET ROUTER
router.get("/url/:code", redirect);

module.exports = router;
