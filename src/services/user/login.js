const { NotAcceptable } = require("rest-api-errors");
const { sendOne, STATUSES, DB_ERRORS } = require("../../middleware");

const userLoginService = async (params, { User }, { config }) => {
  try {
    const address = params.address;
    const userRecord = await User.findOne({ address });

    if(userRecord){
        return {
            log: "Logged in successfully",
            flag: STATUSES.ACTION_COMPLETE,
            userId: userRecord._id
          };
    }
    else{
      //Create new user
        user = new User({
        address: address
        });
        user.save();  
        return {
            log: "User registered successfully",
            flag: STATUSES.ACTION_COMPLETE,
            userId: user._id
          };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { userLoginService };
