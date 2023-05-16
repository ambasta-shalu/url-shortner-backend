const mongoose = require("mongoose");

async function DB() {
  mongoose.connect(process.env.MONGO_DB_URI);
  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.info("Mongoose connected ");
  });

  connection.on("error", (err) => {
    console.error("Mongoose connection error: " + err.message);
  });

  connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
}

module.exports = DB;
