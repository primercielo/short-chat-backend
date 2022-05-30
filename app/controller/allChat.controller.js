const db = require("../initialize/db.initialize");
const Chat = db.Chat;
const { Op } = require("sequelize");

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

exports.deleteOneChat = async (req, res) => {
  try {
    const chat = await db.sequelize.query(`DELETE FROM public."Chats"
    WHERE id = ${req.params.id}`);
    res
      .status(200)
      .send({ message: `Successfully deleted id: ${req.params.id} data.` });
  } catch (error) {
    res.status(200).send({ error: "Error! while in deleteOneChat()" });
  }
};

exports.deleteRangeChat = async (req, res) => {
  console.log(req.params);
  try {
    const chat = await Chat.destroy({
      where: {
        id: {
          [Op.between]: [req.params.fromid, req.params.toid],
        },
      },
    });
    res.status(200).send({
      message: `Successfully deleted between: ${req.params.fromid} and  ${req.params.toid} data.`,
    });
  } catch (error) {
    res
      .status(200)
      .send({ error: `Error! while in deleteRangeChat() ${error}` });
  }
};
