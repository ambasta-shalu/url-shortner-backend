const express = require("express");
const UrlModel = require("../models/UrlModel");

// creating express route handler
const router = express.Router();

router.get("/url/:code", async (req, res) => {
  try {
    // find a document match to the code in req.params.code
    const url = await UrlModel.findOne({
      urlCode: req.params.code,
    });

    if (url) {
      return res.json(url);
    }

    return res.status(404).json({
      msg: "url not found",
    });
  } catch (error) {
    // exception handler
    console.error(error);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
