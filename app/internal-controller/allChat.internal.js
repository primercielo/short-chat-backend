// without relation controller
const db = require("../initialize/db.initialize");
const Chat = db.Chat;

exports.createChat = async ({ name, msg, location, ip, uId }) => {
  try {
    const response = await Chat.create({
      name: name.toUpperCase(),
      msg: msg,
      location: location,
      ip: ip,
      uId: uId,
    });
    console.log("Chat URL created: ", response);
  } catch (error) {
    console.log({ message: `Error! while in createChat() ${error}` });
  }
};
