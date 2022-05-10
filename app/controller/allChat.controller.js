const db = require("../initialize/db.initialize");
const Chat = db.Chat;

exports.getAllChat = async (req, res) => {
  try {
    const response = await Chat.findAndCountAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send({ message: "Error! while in getAllChat()" });
  }
};