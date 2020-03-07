require("dotenv").config();
const mongoose = require("mongoose");
var mongodb = require("mongo-mock");
mongodb.max_delay = 0; //you can choose to NOT pretend to be async (default is 400ms)

const MONGO_USERNAME = process.env.mongo_username;
const MONGO_PASSWORD = process.env.mongo_password;
const MONGO_HOSTNAME = process.env.mongo_host;
const MONGO_PORT = process.env.mongo_port;
const MONGO_DB = process.env.mongodb_name; // e.g datman;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

function connect() {
  if (process.env.NODE_ENV === "test") {
    var uri = "mongodb://localhost:27017/myproject";

    return new Promise((resolve, reject) => {
      mongoose
        .connect(
          uri,
          {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
        )
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(
          url,
          {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
        )
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    });
  }
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
