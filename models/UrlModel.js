const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    longUrl: {
      type: String,
      required: [true, "Please provide an URL"],
    },
    shortUrl: {
      type: String,
      unique: true,
    },
    urlCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const urlModel = mongoose.model("Url", urlSchema);

module.exports = urlModel;
