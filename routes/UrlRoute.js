const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
const UrlModel = require("../models/UrlModel");
const AuthUser = require("../middleware/AuthUser");

// creating express route handler
const router = express.Router();

router.post("/", AuthUser, async (req, res) => {
  // destructure the longUrl from req.body.longUrl
  const { longUrl } = req.body;

  // finding user id from auth user
  const userId = req.user._id;

  // if valid, we create the url code
  const urlCode = shortid.generate();

  // check long url if valid using the validUrl.isUri method
  if (validUrl.isUri(longUrl)) {
    try {
      /* The findOne() provides a match to only the subset of the documents 
            in the collection that match the query. In this case, before creating the short URL,
            we check if the long URL was in the DB ,else we create it.
            */
      let url = await UrlModel.findOne({ longUrl, userId });

      // url exist and return the respose
      if (url) {
        return res.json(url);
      } else {
        // join the generated short code
        const shortUrl = urlCode;

        // invoking the Url model and saving to the DB
        url = new UrlModel({
          userId,
          longUrl,
          shortUrl,
          urlCode,
        });

        await url.save();

        return res.status(201).json({
          status: 201,
          message: "Url Shorten Successfully",
          shortUrl,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

module.exports = router;
