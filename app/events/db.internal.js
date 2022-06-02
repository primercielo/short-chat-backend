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
    chat.deleteRangeDateChat(data, io);
  });

  socket.on("get-first-chat", () => {
    chat.getFirstChat(io);
  });
  // site admin menu
  socket.on("block-site-status", () => {
    admin.getAuth(io);
  });

  socket.on("blocked-site", (data) => {
    admin.blockSite(data, io);
    io.emit("site-blocked");
  });

  socket.on("blocked-online", (data) => {
    admin.blockOnline(data, io);
    io.emit("online-blocked");
  });

  socket.on("blocked-call", (data) => {
    admin.blockCall(data, io);
    io.emit("call-blocked");
  });

  socket.on("blocked-day", (data) => {
    admin.blockDay(data, io);
    io.emit("day-blocked");
  });

  socket.on("blocked-menu", (data) => {
    admin.blockMenu(data, io);
    io.emit("menu-blocked");
  });

  socket.on("blocked-transcript", (data) => {
    admin.blockTranscript(data, io);
    io.emit("transcript-blocked");
  });

  socket.on("blocked-partager", (data) => {
    admin.blockPartager(data, io);
    io.emit("partager-blocked");
  });

  socket.on("blocked-chatinput", (data) => {
    admin.disableChat(data, io);
    io.emit("chatinput-blocked");
  });

  socket.on("blocked-chat", (data) => {
    admin.blockChat(data, io);
    io.emit("chat-blocked");
  });

  // site admin menu

  socket.on("view-incremented", (data) => {
    social.incrementView(data, io);
  });
};
