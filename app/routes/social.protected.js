const social = require("../controller/social.controller");
const { auth } = require("../middleware");
module.exports = (app) => {
  app.post("/social", social.createPost);
  app.get("/socials/:limit", social.getPosts);
  app.get("/social/destroy", social.socialDeleteAllPost);
};
