const mongoose = require("mongoose");
const { schema } = require("./schema");

// Add hooks here
// schema.pre('save', function() {
// });
const Token = mongoose.model("Token", schema);
module.exports = { Token };
