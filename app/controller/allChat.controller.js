const db = require("../initialize/db.initialize");
const Chat = db.Chat;

exports.getAllChat = async (req, res) => {
  try {
    // const response = await Chat.findAndCountAll({
    //   order: [["createdAt", "DESC"]],
    //   offset: 0,
    //   limit: req.params.limit,
    // });
    let chats = {};
    const response = await db.sequelize
      .query(`SELECT * FROM (SELECT * FROM public."Chats"
ORDER BY id DESC
LIMIT ${req.params.limit}) a ORDER BY id ASC`);
    chats.count = response[1].rowCount;
    chats.rows = response[1].rows;
    res.status(200).send(chats);
  } catch (error) {
    res.status(200).send({ message: "Error! while in getAllChat()" });
  }
};
