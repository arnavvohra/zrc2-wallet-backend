const { NotAcceptable } = require("rest-api-errors");
const { sendOne } = require("../../middleware");
const { addTokenService } = require("../../services/token");

const addToken = ({ User }, {Token}, { config }) => async (req, res, next) => {
  try {
    let params = req.body;

    let result = await addTokenService(params, { User }, { Token }, { config });

    sendOne(res, result);
  } catch (error) {
    next(error);
  }
};

module.exports = { addToken };
