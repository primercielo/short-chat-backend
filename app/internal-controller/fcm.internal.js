const db = require("../initialize/db.initialize");
const Fcm = db.Fcm;

exports.createFcm = async (data) => {
  try {
    const fcm = await Fcm.create({
      uId: data.id,
      token: data.token,
      UserId: data.id,
    });
    console.log("FCM saved: ", fcm);
  } catch (error) {
    console.log(error);
  }
};
