const chat = require("../controller/allChat.controller");
const { auth } = require("../middleware");
module.exports = (app) => {
  app.get("/chat", auth.verifyCode, chat.getAllChat);
};
