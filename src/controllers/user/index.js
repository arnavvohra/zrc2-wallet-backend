const { Router: router } = require("express");
const { userLogin } = require("./login");
const { celebrate, Joi } = require("celebrate");

module.exports = ({ User }, { config }) => {
  const api = router();
  api.post(
    "/",
    celebrate({
      body: Joi.object().keys({
        address: Joi.string().required()
      })
    }),
    userLogin({ User }, { config })
  );

  return api;
};
