const { NotAcceptable } = require("rest-api-errors");
const { sendOne, STATUSES, DB_ERRORS } = require("../../middleware");

const addTokenService = async (params, { User }, { Token },{ config }) => {
  try {
    const userAddress = params.userAddress;
    const contractAddress = params.contractAddress;
    const userRecord = await Token.findOne( { $and: [ { userAddress: userAddress }, { contractAddress: contractAddress } ] } ); 
    if(userRecord){
        return {
            log: "Token already added",
            flag: STATUSES.ACTION_FAILED
          };
    }
    else{
      //Add new token
        token = new Token({
          userAddress: userAddress,
          contractAddress: contractAddress
        });
        token.save();  
        return {
            log: "Token added successfully",
            flag: STATUSES.ACTION_COMPLETE
          };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { addTokenService };
