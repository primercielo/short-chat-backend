const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: { origins: ["https://short-chat-n.vercel.app/"] },
});

const { ExpressPeerServer } = require("peer");

const peerServer = ExpressPeerServer(http, { debug: true });

app.use("/peerjs", peerServer);
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

message.push({
  id: 456789,
  chat: "🔒 Welcome to most secure  chat app in the world 🎉. After, every 10 minutes, all of the chat messages will be erased.",
  createdAt: Date.now(),
});

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
    message.push({
      id: 456789,
      chat: "previous messages erased ✅",
      createdAt: Date.now(),
    });
    io.emit("chat message", message);
  }, 3000);
}, 600000);

let i = 0;

io.on("connection", (socket) => {
  io.emit("chat message", message);

  console.log(socket.id);
  // const readStream = fs.createReadStream(path.resolve(__dirname, "./img.jpg"), {
  //     encoding: "binary",
  //   }),
  //   chunks = [];
  // let delay = 0;
  // readStream.on("data", function (chunk) {
  //   chunks.push(chunk);

  //   socket.emit("img-chunk", chunk);
  // });

  socket.on("calling", (caller) => {
    io.emit("incoming-call", caller);
  });

  socket.on("close-call", (id) => {
    io.emit("close-call", id);
  });
  socket.on("call-end", (id) => {
    io.emit("call-end", id);
  });
  socket.on("call-received", (id) => {
    io.emit("call-received", id);
  });

  socket.on("chat message", (msg) => {
    message.push(msg);
    console.log(message);
    io.emit("chat message", message);
  });
  socket.on("typing", function (isTyping) {
    io.emit("typing", isTyping);
  });

  // for audio call
  socket.on("join", (userId) => {
    console.log(userId, "connected");
    io.emit("user-connected", userId);
    console.log("user-connected fired");
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
