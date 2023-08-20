const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
async function signup(req, res) {
  try {
    // GET USER INPUT
    const { email, firstName, lastName, password } = req.body;

    // CHECK IF USER ALREADY EXISTS
    // VALIDATE IF USER EXISTS IN OUR DATABASE
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login 😑");
    }

    // ENCRYPT USER PASSWORD
    encryptedPassword = await bcrypt.hash(password, 10);

    // CREATE USER IN OUR DATABASE
    const user = await UserModel.create({
      email: email.toLowerCase(), // SANITIZE: CONVERT EMAIL TO LOWERCASE
      firstName: firstName,
      lastName: lastName,
      password: encryptedPassword,
    });

    // CREATE TOKEN
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "6h",
      }
    );

    // SAVE USER TOKEN
    user.token = token;

    // RETURN TOKEN TO USER
    return res.status(201).json({
      status: 201,
      message: "User Signed Up Successfully",
      token,
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

// LOGIN
async function login(req, res) {
  try {
    // GET USER INPUT
    const { email, password } = req.body;

    // VALIADTE USER INPUT
    if (!(email && password)) {
      res.status(400).send("All Input Is Required 😑");
    }

    // VALIDATE IF USER EXISTS IN OUR DATABASE
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // CREATE TOKEN
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "6h",
        }
      );

      // SAVE USER TOKEN
      user.token = token;

      // RETURN TOKEN TO USER
      return res.status(200).json({
        status: 200,
        message: "User Logged In Successfully",
        token,
      });
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}

// *********************************************************************************************************************

// GET USER DATA
async function getUserData(req, res) {
  try {
    // GET USER
    const user = req.user;
    return res.status(200).json({
      status: 200,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}

module.exports = { signup, login, getUserData };
