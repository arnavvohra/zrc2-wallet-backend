const uuidv4 = require("uuid/v4");

const createUniqueId = () => {
  return uuidv4();
};

module.exports = { createUniqueId };
