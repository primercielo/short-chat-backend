// without relation controller
const db = require("../initialize/db.initialize");
const Chat = db.Chat;
const Time = db.Time;

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

  // const createTime = await Time.update(
  //   { setTime: currentTimes },
  //   { where: { id: 1 } }
  // );

  const time = await Time.findOne({ where: { id: 1 } });
  const dateCreated = new Date(time.updatedAt).getDate();
  const currentDate = new Date().getDate();
  console.log(
    "Day remain to delete all the chat for the last 30 days: ",
    currentDate - dateCreated
  );
  if (currentDate - dateCreated >= 30) {
    const time = await Time.update(
      { setTime: currentTimes },
      { where: { id: 1 } }
    );
    const chat = await Chat.destroy({ truncate: true });
    console.log("All Chat deleted for the past 30 days.");
  }
};
