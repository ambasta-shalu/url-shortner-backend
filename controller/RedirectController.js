const UrlModel = require("../models/UrlModel");

async function redirect(req, res) {
  try {
    // find a document match to the code in req.params.code
    const url = await UrlModel.findOneAndUpdate(
      { urlCode: req.params.code },
      { $inc: { clickCount: 1 } }
    );

    if (url) {
      // return url
      return res.status(201).json({
        status: 201,
        url,
      });
    }

    return res.status(404).json({
      status: 404,
      message: "url not found 😑",
    });
  } catch (error) {
    // exception handler
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

module.exports = { redirect };
