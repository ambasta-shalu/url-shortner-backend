require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { API_PORT } = process.env;
const db = require("./db/DB");
const userRoute = require("./routes/UserRoute");

const app = express();
const port = process.env.PORT || API_PORT;

// calling mongodb here
db();

// middleware
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

// routes
app.get("/", (req, res) => {
  res.send("Welome to Root 🤓");
});

app.use(userRoute);

// app listening
app.listen(port, (error) => {
  if (!error) console.log("server is successfully running on port " + port);
  else console.log("error occurred, server can't start", error);
});
