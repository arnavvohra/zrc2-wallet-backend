const { Router: router } = require("express");
const { addToken } = require("./add-token");
const { tokenList } = require("./token-list");
const { celebrate, Joi } = require("celebrate");

module.exports = ({ User }, {Token}, { config }) => {
  const api = router();
  api.post(
    "/add-token",
    celebrate({
      body: Joi.object().keys({
        userAddress: Joi.string().required(),
        contractAddress: Joi.string().required()
      })
    }),
    addToken({ User }, { Token }, { config })
  );
  api.get("/token-list", tokenList({ Token }, { config }));

  return api;
};
