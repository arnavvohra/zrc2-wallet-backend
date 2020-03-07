const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  userAddress: {
    type: String,
    required: true
  },
  contractAddress: {
    type: String,
    required: true
  }
});

module.exports = { schema };
