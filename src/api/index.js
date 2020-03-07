const express = require("express");

const { errorHandler } = require("../middleware");
const { errors } = require("celebrate");
// list of models here
const { User } = require("../models/user");
const { Token } = require("../models/token");

// list of controllers here
const user = require("../controllers/user");
const token = require("../controllers/token");

const routersInit = config => {
  const router = express();
  // register api points

  router.use("/login", user({ User }, { config }));
  router.use("/token", token({ User }, {Token}, { config }));

  router.use(errors());
  // catch api all errors
  router.use(errorHandler);

  return router;
};

module.exports = routersInit;
