const validUrl = require("valid-url");
const shortid = require("shortid");
const UrlModel = require("../models/UrlModel");

// CREATE SHORT URL
async function createShortUrl(req, res) {
  // DESTRUCTURE THE LONGURL FROM REQ.BODY.LONGURL
  const { longUrl } = req.body;

  // FINDING USER ID FROM AUTH USER
  const userid = req.user._id;

  // IF VALID, WE CREATE THE URL CODE
  const urlCode = shortid.generate();

  // CHECK LONG URL IF VALID USING THE VALIDURL.ISURI METHOD
  if (validUrl.isUri(longUrl)) {
    try {
      /* THE FINDONE() PROVIDES A MATCH TO ONLY THE SUBSET OF THE DOCUMENTS 
        IN THE COLLECTION THAT MATCH THE QUERY. IN THIS CASE, BEFORE CREATING THE SHORT URL,
        WE CHECK IF THE LONG URL WAS IN THE DB, ELSE WE CREATE IT.
       */
      let url = await UrlModel.findOne({ longUrl, userid });

      // URL EXISTS AND RETURN THE RESPONSE
      if (url) {
        return res.json(url);
      } else {
        // JOIN THE GENERATED SHORT CODE
        const shortUrl = urlCode;

        // CREATE URL IN OUR DATABASE
        url = new UrlModel({
          userid,
          longUrl,
          shortUrl,
          urlCode,
          clickCount: 0,
        });

        await url.save();

        // RETURN SHORT URL
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
    // FINDING USER ID FROM AUTH USER
    const userid = req.user._id;

    // FETCHING ALL URLS RELATED TO SPECIFIED USER ID
    const allUrls = await UrlModel.find({ userid });

    // RETURN ALL URLS
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
    // FINDING USER ID FROM AUTH USER
    const userid = req.user._id;

    // FINDING URLID FROM PARAMS TO DELETE
    const urlId = req.params.urlId;

    // VALIDATE URL ID
    if (!urlId) {
      res.status(409).send("Url Id Is Required 😑");
    }

    const isDeleted = await UrlModel.deleteOne({ userid, _id: urlId });

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
