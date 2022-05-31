const fcm = require("../../app/internal-controller/fcm.internal");
const admin = require("../../app/internal-controller/admin.internal");
const social = require("../../app/internal-controller/social.internal");
const chat = require("../../app/internal-controller/allChat.internal");

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
    io.emit("social-post");
  });

  socket.on("happy", (id) => {
    social.incrementHappy(id);
    io.emit("social-post");
  });

  socket.on("sad", (id) => {
    social.incrementSad(id);
    io.emit("social-post");
  });

  socket.on("delete-chat-between-date", (data) => {
    chat.deleteRangeDateChat(data);
    io.emit("deleted-chat-between-date");
  });

  socket.on("get-first-chat", () => {
    chat.getFirstChat(io);
  });

  socket.on("block-site-status", () => {
    admin.getAuth(io);
  });
  socket.on("blockd-site", (data) => {
    admin.blockSite(data);
    io.emit("site-blocked");
  });
};
