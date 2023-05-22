const validUrl = requicreateShortUrlre("valid-url");
const shortid = require("shortid");
const UrlModel = require("../models/UrlModel");

// CREATE SHORT URL
async function createShortUrl(req, res) {
  // destructure the longUrl from req.body.longUrl
  const { longUrl } = req.body;

  // finding user id from auth user
  const userid = req.user._id;

  // if valid, we create the url code
  const urlCode = shortid.generate();

  // check long url if valid using the validUrl.isUri method
  if (validUrl.isUri(longUrl)) {
    try {
      /* The findOne() provides a match to only the subset of the documents 
              in the collection that match the query. In this case, before creating the short URL,
              we check if the long URL was in the DB ,else we create it.
              */
      let url = await UrlModel.findOne({ longUrl, userid });

      // url exist and return the respose
      if (url) {
        return res.json(url);
      } else {
        // join the generated short code
        const shortUrl = urlCode;

        // Create url in our database
        url = new UrlModel({
          userid,
          longUrl,
          shortUrl,
          urlCode,
        });

        await url.save();

        // return short url
        return res.status(201).json({
          status: 201,
          message: "Url Shorten Successfully",
          shortUrl,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  } else {
    return res.status(401).json("Invalid longUrl");
  }
}

module.exports = { createShortUrl };
