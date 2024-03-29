require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db/DB");
const userRoute = require("./routes/UserRoute");
const urlRoute = require("./routes/UrlRoute");
const redirectRoute = require("./routes/RedirectRoute");
const checkHealthRoute = require("./routes/CheckHealthRoute");

const app = express();
const port = process.env.PORT || 7000;

// CALLING MONGODB HERE
db();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

// ROUTES
app.use(userRoute);
app.use(urlRoute);
app.use(redirectRoute);
app.use(checkHealthRoute);

// APP LISTENING
app.listen(port, (error) => {
  if (!error) console.log(`server is successfully running on port ${port}`);
  else console.log(`error occurred, server can't start ${error}`);
});
