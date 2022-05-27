const fcm = require("../../app/internal-controller/fcm.internal");

module.exports = (socket, io) => {
  socket.on("save-fcm-token", (data) => {
    console.log("FCM received data: ", data);
    fcm.createFcm(data);
  });
};
