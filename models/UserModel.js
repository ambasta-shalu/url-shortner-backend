const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please Provide An Email 😑"],
      unique: [true, "Email Exist 😑"],
    },
    firstName: {
      type: String,
      required: [true, "Please Provide First Name 😑"],
      unique: false,
    },
    lastName: {
      type: String,
      required: [true, "Please Provide Last Name 😑"],
      unique: false,
    },
    password: {
      type: String,
      required: [true, "Please Provide A Password 😑"],
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
