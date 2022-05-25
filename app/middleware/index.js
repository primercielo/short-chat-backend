const auth = require("./auth.code");
const authJwt = require("./auth.jwt");
const verifySignUp = require("./verify.signup");

module.exports = {
  auth,
  authJwt,
  verifySignUp,
};
