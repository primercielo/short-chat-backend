// without relation controller
const db = require("../initialize/db.initialize");
const Chat = db.Chat;
const Time = db.Time;
const { Op } = require("sequelize");

function removeTimeZone(date) {
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");
  return dateString;
}

exports.createChat = async ({ name, msg, location, ip, uId }) => {
  try {
    const response = await Chat.create({
      name: name.toUpperCase(),
      msg: msg,
      location: location,
      ip: ip,
      uId: uId,
    });
  } catch (error) {
    console.log({ message: `Error! while in createChat() ${error}` });
  }
};

exports.deleteChatInterval = async () => {
  const currentTimes = new Date();

  const time = await Time.findOne({ where: { id: 1 } });
  const dateCreated = new Date(time.updatedAt).getDate();
  const currentDate = new Date().getDate();
  console.log(
    "Day remain to delete all the chat for the last 10 days: ",
    10 - (currentDate - dateCreated)
  );
  if (currentDate - dateCreated >= 10) {
    const time = await Time.update(
      { setTime: currentTimes },
      { where: { id: 1 } }
    );
    const chat = await Chat.destroy({ truncate: true });
    console.log("All Chat deleted for the past 10 days.");
  }
};

exports.getFirstChat = async (io) => {
  try {
    const chat = await Chat.findAndCountAll({
      order: [["createdAt", "ASC"]],
      offset: 0,
      limit: 1,
    });
    io.emit("send-first-chat", chat);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteRangeDateChat = async (data) => {
  try {
    console.log("FROM ", new Date(data.from), "TO: ", new Date(data.to));

    const chat = await Chat.destroy({
      where: {
        createdAt: {
          [Op.gte]: new Date(data.from),
          [Op.lte]: new Date(data.to),
        },
      },
    });
    console.log({
      message: `Successfully deleted chat between: ${req.params.fromid} and  ${req.params.toid} data.`,
    });
  } catch (error) {
    console.log({ error: `Error! while in deleteRangeDateChat() ${error}` });
  }
};
