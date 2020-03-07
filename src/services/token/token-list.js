const { NotAcceptable } = require("rest-api-errors");
const { sendOne, STATUSES, DB_ERRORS } = require("../../middleware");

const tokenListService = async (userAddress, { Token }, { config }) => {
  try {
    const tokensList = await Token.find({ userAddress });

    if (tokensList.length === 0) {
      return {
        log: "No Token Added",
        flag: STATUSES.ACTION_COMPLETE
      };
    }
    else{
      return {
        log: "Tokens fetched successfully",
        flag: STATUSES.ACTION_COMPLETE,
        tokensList: tokensList
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { tokenListService };
