const db = require("../initialize/db.initialize");
const User = db.User;

exports.isOnline = async ({ online, socketId, id }) => {
  console.log("Is online: ", online ? "Online" : "Offline");
  const user = await User.update(
    {
      online: online,
      socketId: socketId,
    },
    { where: { id: id } }
  );

  const userData = await User.findOne({ where: { id: id } });

  if (!user) {
    console.log({
      error: `Error on updating online status, (internal controller) isOnline()`,
    });
  }
  if (user) {
    console.log({ message: `Successfully updated user online status ${user}` });
  }
  return userData;
};

exports.setOffline = async ({ online, socketId }) => {
  console.log("Is offline: ", online ? false : true);
  const user = await User.update(
    {
      online: online,
      socketId: socketId,
    },
    { where: { socketId: socketId } }
  );
  console.log("Set Offline: (user)", user);
  if (!user) {
    console.log({
      error: `Error on updating offline status, (internal controller) setOffline()`,
    });
  }
  if (user) {
    console.log({
      message: `Successfully updated user offline status ${user}`,
    });
  }
};
