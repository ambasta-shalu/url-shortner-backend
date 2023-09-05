const mongoose = require("mongoose");

async function DB() {
  mongoose.connect(process.env.MONGO_DB_URI);
  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.info("Mongoose Connected ");
  });

  connection.on("error", (err) => {
    console.error(`Mongoose Connection Error: ${err.message}`);
  });

  connection.on("disconnected", () => {
    console.log("Mongoose Disconnected");
  });
}

module.exports = DB;
