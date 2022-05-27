const db = require("../initialize/db.initialize");
const { Op } = require("sequelize");
const Fcm = db.Fcm;
const User = db.User;

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

function filteredDuplicateToken(array) {
  const ids = array.map((o) => o.token);
  const filtered = array.filter(
    ({ token }, index) => !ids.includes(token, index + 1)
  );
  let tokens = [];
  filtered.map((item) => {
    tokens.push(item.token);
  });
  return tokens;
}

exports.pushNotification = async (data) => {
  const fcm = await Fcm.findAndCountAll({
    where: { UserId: { [Op.ne]: data.id } },
    order: [["createdAt", "DESC"]],
    include: [User],
  });
  console.log(filteredDuplicateToken(fcm.rows));
  console.log(fcm);
  some(filteredDuplicateToken(fcm.rows));
};

function some(token) {
  console.log("Token from some: ", token);
}
