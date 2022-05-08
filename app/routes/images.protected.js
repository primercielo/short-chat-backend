const images = require("../controller/images.controller");

module.exports = (app) => {
  app.post("/image", images.createImage);
  app.get("/images", images.getAllImages);
};
