const fcm = require("../../app/internal-controller/fcm.internal");
const admin = require("../../app/internal-controller/admin.internal");

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
};
