const images = require("../controller/images.controller");
const { auth } = require("../middleware");
module.exports = (app) => {
  app.post("/image", images.createImage);
  app.get("/images", auth.verifyCode, images.getAllImages);
};
