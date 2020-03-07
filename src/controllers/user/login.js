const { NotAcceptable } = require("rest-api-errors");
const { sendOne } = require("../../middleware");
const { userLoginService } = require("../../services/user");

const userLogin = ({ User }, { config }) => async (req, res, next) => {
  try {
    let params = req.body;

    let result = await userLoginService(params, { User }, { config });

    sendOne(res, result);
  } catch (error) {
    next(error);
  }
};

module.exports = { userLogin };
