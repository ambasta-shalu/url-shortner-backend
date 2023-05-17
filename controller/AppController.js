const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
async function signup(req, res) {
  try {
    // Get user input
    const { email, firstName, lastName, password } = req.body;

    // Check if user already exist
    // Validate if user exist in our database
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login 😑");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await UserModel.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      firstName: firstName,
      lastName: lastName,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // return token to user
    return res.status(201).json({
      status: 201,
      message: "User Created Successfully",
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
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // return token to user
      return res.status(200).json({
        status: 200,
        message: "Login Successful",
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
async function getUser(req, res) {
  try {
    // Get user
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

module.exports = { signup, login, getUser };
