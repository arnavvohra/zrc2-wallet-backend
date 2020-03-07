const ms = require("ms");
const getTimeInMilliseconds = () => {
  return Date.now();
};

const getTimeDifference = time => {
  return ms(getTimeInMilliseconds() - time, { long: true });
};

module.exports = { getTimeInMilliseconds, getTimeDifference };
