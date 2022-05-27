const user = require("../controller/usert.controller");
const fcm = require("../controller/fcm.controller");
const { authJwt, verifySignUp } = require("../middleware");

module.exports = (app) => {
  app.post("/signin", user.signIn);
  app.post("/signup", verifySignUp.checkDuplicateEmail, user.createUser);
  app.get("/users", user.getAllUsers);
  app.get("/users/destroy", user.destroyAllUser);
  app.get("/verifyToken/:token", user.verifyToken);
  app.post("/createfcm", fcm.createFcm);
  app.get("/getallfcm", fcm.getAllFcm);
  app.get("/getuserfcm/:userid", fcm.getUserFcm);
  app.get("/getexuserfcm/:userid", fcm.getExecptUserFcm);
  app.get("/destroy/fcm", fcm.destroyFcm);
};
