const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    longUrl: {
      type: String,
      required: [true, "Please provide a Long URL 😑"],
    },
    shortUrl: {
      type: String,
      unique: true,
    },
    urlCode: {
      type: String,
      unique: true,
    },
    clickCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const urlModel = mongoose.model("Url", urlSchema);

module.exports = urlModel;
