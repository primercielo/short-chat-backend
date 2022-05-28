const db = require("../initialize/db.initialize");
const { Op } = require("sequelize");
const Fcm = db.Fcm;
const User = db.User;
const fetch = require("node-fetch");

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

function checkExist(array, id, token) {
  const data = array.map(
    (item) => item["UserId"] === id && item["token"] === token
  );
  return data.includes(true, 0);
}

exports.createFcm = async (data) => {
  try {
    const getAllFcm = await Fcm.findAndCountAll({
      order: [["createdAt", "DESC"]],
      include: [User],
    });

    if (!checkExist(getAllFcm.rows, data.id, data.token)) {
      const fcm = await Fcm.create({
        uId: data.id,
        token: data.token,
        UserId: data.id,
      });
    } else {
      console.log(
        `\n****\n Token already exists for the user  ${data.id}. Did not create duplicate for id: ${data.id}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.pushNotification = async (data) => {
  const fcm = await Fcm.findAndCountAll({
    where: { UserId: { [Op.ne]: data.id } },
    order: [["createdAt", "DESC"]],
    include: [User],
  });
  fcmSend(filteredDuplicateToken(fcm.rows), data);
};

function fcmSend(token, data) {
  let notification = {
    title: data.name,
    body: "chat" in data ? data.chat : `Media/File`,
    icon: "https://firebasestorage.googleapis.com/v0/b/short-chat-c385d.appspot.com/o/icons8-secure-64.png?alt=media&token=9be642bb-341c-4af8-9d2f-58f1c284d173",

    image:
      "https://firebasestorage.googleapis.com/v0/b/short-chat-c385d.appspot.com/o/technology.jpg?alt=media&token=45252d21-f566-426e-b02d-24ef8f4e58f3",
    sound: "default",
    contents: "https://short-chat.vercel.app/",
    default_vibrate_timings: true,
  };

  var notificationBody = {
    notification: notification,
    registration_ids: token,
  };

  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization:
        "key=" +
        "AAAAelu-gb8:APA91bEWDJBEM3V43lASjhXRapy0eR9tC5NqH8oYNdNFuWT7Cw3pDzzMYZG4EhQz23CSFrZr0hPsm67F0wp1tUq06q600WqpsIa33McM0Nd-2XmoJvSSgrJmsH1EOi7xK2JjGZ9rh34i",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notificationBody),
  })
    .then((ress) => {
      return ress.text();
    })
    .then(() => {
      console.log("Notification send successfully-Server-3");

      console.log({
        message: "Notification send successfully Server 3",
      });
    })
    .catch((err) => {
      console.log(err.message);
      console.log({
        error: "There is an error occurred while sending notification Server 3",
      });
    });
}
