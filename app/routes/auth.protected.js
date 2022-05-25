const user = require("../controller/usert.controller");
const { authJwt, verifySignUp } = require("../middleware");

module.exports = (app) => {
  app.post("/signin", user.signIn);
  app.post("/signup", verifySignUp.checkDuplicateEmail, user.createUser);
  app.get("/users", user.getAllUsers);
  app.get("/users/destroy", user.destroyAllUser);
  app.get("/verifyToken/:token", user.verifyToken);
};
