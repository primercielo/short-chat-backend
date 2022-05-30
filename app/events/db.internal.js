const fcm = require("../../app/internal-controller/fcm.internal");
const admin = require("../../app/internal-controller/admin.internal");
const social = require("../../app/internal-controller/social.internal");

module.exports = (socket, io) => {
  socket.on("save-fcm-token", (data) => {
    console.log("FCM received data: ", data);
    fcm.createFcm(data);
  });

  socket.on("chat message", (msg) => {
    fcm.pushNotification(msg);
  });

  socket.on("admin-post", (post) => {
    admin.createPost(post);
    io.emit("admin-post");
  });

  socket.on("admin-post-delete", (id) => {
    admin.deletePost(id);
    io.emit("admin-post");
  });

  socket.on("heart", (id) => {
    social.incrementHeart(id);
    io.emit("heart-reacted");
  });
  socket.on("happy", (id) => {
    social.incrementHappy(id);
    io.emit("happy-reacted");
  });
  socket.on("sad", (id) => {
    social.incrementSad(id);
    io.emit("sad-reacted");
  });
};
