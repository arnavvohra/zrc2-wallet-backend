const { NotAcceptable } = require("rest-api-errors");
const { sendOne } = require("../../middleware");

const { tokenListService } = require("../../services/token");

const tokenList = ({ Token }, { config }) => async (req, res, next) => {
  try {
    let userAddress = req.query.userAddress;
    let result = await tokenListService(userAddress, { Token }, { config });
    sendOne(res, result);
  } catch (error) {
    next(error);
  }
};

module.exports = { tokenList };
