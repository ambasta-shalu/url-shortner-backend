const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an Email 😑"],
      unique: [true, "Email Exist 😑"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide First Name 😑"],
      unique: false,
    },
    lastName: {
      type: String,
      required: [true, "Please provide Last Name 😑"],
      unique: false,
    },
    password: {
      type: String,
      required: [true, "Please provide a Password 😑"],
      unique: false,
      minLength: 8,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
