const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  address: {
    type: String,
    required: true,
    createIndex: { unique: true }
  }
});

module.exports = { schema };
