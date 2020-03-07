const mongoose = require("mongoose");
const { schema } = require("./schema");

// Add hooks here
// schema.pre('save', function() {
// });
const User = mongoose.model("User", schema);
module.exports = { User };
