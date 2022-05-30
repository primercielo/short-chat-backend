const admin = require("../controller/admin.controller");
const { auth } = require("../middleware");
module.exports = (app) => {
  app.post("/admin", admin.createPost);
  app.get("/admin/:limit", admin.getPosts);
  app.get("/admin/:uid", admin.getSingleUserAllPosts);
  app.get("/admin/destroy", admin.adminDeleteAllPost);
};
