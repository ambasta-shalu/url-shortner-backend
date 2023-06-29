const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

// Function to enable me to protect a login endpoint from unauthenticated users.
async function AuthUser(req, res, next) {
  // const token =
  //   req.body.token || req.query.token || req.headers["x-access-token"];

  //   get the token from the authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(409).send("A token is required for authentication 😑");
  }
  try {
    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await userModel.findById(decodedToken.user_id);

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
}

module.exports = AuthUser;
