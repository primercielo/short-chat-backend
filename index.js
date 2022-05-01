const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: { origins: ["https://short-chat.vercel.app/"] },
});
const cors = require("cors");
const fs = require("fs"),
  path = require("path");

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// function startTimer(params) {
//   var clearTime = setInterval(() => {
//     io.emit("timer", i++);
//     if (i > 10) {
//       i = 0;
//     }
//   }, 1000);
// }

let message = [];

setInterval(() => {
  message = [];
  console.log("Array Emptied");
  let msg = "Chat Deleted";
  function alert(msg) {
    io.emit("alert", msg);
    io.emit("chat message", message);
  }
  alert(msg);
  setTimeout(() => {
    alert(null);
  }, 3000);
}, 600000);

let i = 0;

io.on("connection", (socket) => {
  io.emit("chat message", message);

  console.log(socket.id);
  const readStream = fs.createReadStream(path.resolve(__dirname, "./img.jpg"), {
      encoding: "binary",
    }),
    chunks = [];
  let delay = 0;
  readStream.on("data", function (chunk) {
    chunks.push(chunk);

    socket.emit("img-chunk", chunk);
  });
  socket.on("chat message", (msg) => {
    message.push(msg);
    console.log(message);
    io.emit("chat message", message);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
