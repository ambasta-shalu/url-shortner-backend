const validUrl = require("valid-url");
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
          message: "Url Shorten Successfully 👻",
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
    return res.status(401).json("Invalid LongUrl 😑");
  }
}

// *********************************************************************************************************************

// GET ALL URLS
async function getAllUrls(req, res) {
  try {
    // finding user id from auth user
    const userid = req.user._id;

    // fetching all urls related to specified user id
    const allUrls = await UrlModel.find({ userid });

    // return all urls
    return res.status(201).json({
      status: 201,
      message: "All Urls fetched 👻",
      allUrls,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}

// *********************************************************************************************************************

// DELETE A URL
async function delUrl(req, res) {
  try {
    // finding user id from auth user
    const userid = req.user._id;

    // finding urlId from params to delete
    const urlId = req.params.urlId;

    console.log(userid, urlId);

    // Validate URL ID
    if (!urlId) {
      res.status(400).send("Url Id Is Required 😑");
    }

    const isDeleted = await UrlModel.deleteOne({ userid, _id: urlId });

    // return
    return res.status(201).json({
      status: 201,
      message: `Url Deleted 👻.`,
      deletedCount: `${isDeleted.deletedCount}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}

module.exports = { createShortUrl, getAllUrls, delUrl };
