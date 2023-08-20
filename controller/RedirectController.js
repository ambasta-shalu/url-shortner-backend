const UrlModel = require("../models/UrlModel");

async function redirect(req, res) {
  try {
    // FIND A DOCUMENT MATCH TO THE CODE IN REQ.PARAMS.CODE
    const url = await UrlModel.findOneAndUpdate(
      { urlCode: req.params.code },
      { $inc: { clickCount: 1 } }
    );

    if (url) {
      // RETURN URL
      return res.status(201).json({
        status: 201,
        url,
      });
    }

    return res.status(404).json({
      status: 404,
      message: "Url Not Found 😑",
    });
  } catch (error) {
    // EXCEPTION HANDLER
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

module.exports = { redirect };
