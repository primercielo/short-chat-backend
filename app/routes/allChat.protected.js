const chat = require("../controller/allChat.controller");
const { auth } = require("../middleware");
module.exports = (app) => {
  app.get("/chat/:limit", auth.verifyCode, chat.getAllChat);
  app.get("/chat/delete/:id", auth.verifyCode, chat.deleteOneChat);
  app.get("/chat/:fromid/:toid", auth.verifyCode, chat.deleteRangeChat);
};
