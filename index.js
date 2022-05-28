const express = require("express");
const app = express();
const http = require("http").Server(app);

const io = require("socket.io")(http, {
  cors: { origins: ["https://short-chat.vercel.app/"] },
});

const cors = require("cors");

const { ExpressPeerServer } = require("peer");

const peerServer = ExpressPeerServer(http, { debug: true });

var whitelist = [
  "https://short-chat.vercel.app",
  "https://l-c.vercel.app",
  "http://localhost:3000",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// middleware
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/peerjs", peerServer);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// database
require("./app/routes/images.protected")(app);
require("./app/routes/allChat.protected")(app);
require("./app/routes/social.protected")(app);
require("./app/routes/auth.protected")(app);
const image = require("./app/internal-controller/images.internal");
const chat = require("./app/internal-controller/allChat.internal");
const social = require("./app/internal-controller/social.internal");
const user = require("./app/internal-controller/user.internal");
const { lookup } = require("geoip-lite");
var geoip = require("geoip-country");
// end database

var ips = [];
var location;
var ipAd;

app.get("/:pass", (req, res) => {
  ipAd = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  location = geoip.lookup(ipAd);
  console.log(location);

  if (req.params.pass == 63952) {
    chat.deleteChatInterval();
    res.status(200).send(false);
  } else {
    chat.deleteChatInterval();
    res.status(200).send(true);
  }
});

let message = [];

// check for the chat deleted remain times
chat.deleteChatInterval();

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
let connectCounter = 0;

var connectedUsers = [];

function filterDuplicateUsers(array) {
  const ids = array.map((o) => o.id);
  const filtered = array.filter(
    ({ id }, index) => !ids.includes(id, index + 1)
  );
  return filtered;
}

io.on("connection", (socket) => {
  // online-offline status
  console.log("A user connected: ", socket.id);
  io.emit("online");
  socket.on("update-to-online", (data) => {
    user.isOnline(data).then((response) => {
      connectedUsers.push(response);

      // unhandled iterating occured so many times
      // thats why needed to filter out all of the
      // duplicated responses from connectedUsers[]
      const ids = connectedUsers.map((o) => o.id);
      const filtered = connectedUsers.filter(
        ({ id }, index) => !ids.includes(id, index + 1)
      );
      // filter end

      io.emit("online-status", filtered);
    });
  });

  socket.on("disconnect", () => {
    console.log("An user disconnected: ", socket.id);

    connectedUsers.forEach((item, index) => {
      if (item.socketId === socket.id) {
        connectedUsers[index].online = false;
      }
    });

    io.emit("offline", filterDuplicateUsers(connectedUsers));
    user.setOffline({ online: false, socketId: socket.id });
  });
  // online-offline status

  socket.on("get-name", (name) => {
    gName = name;
    console.log("Entered name: ", gName);
  });
  connectCounter++;

  socket.on("abc", (n) => {
    console.log("abc", n);
  });

  io.emit("chat message", message);

  console.log(socket.id);

  socket.on("calling", (caller) => {
    console.log("Calling...");
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
    if (msg) {
      message.push(msg);
      console.log("msg block is executing");
      io.emit("chat message", message);
    } else {
      message.push({
        id: 456789,
        chat: "🔒 Welcome to most secure  chat app in the world 🎉. After, every 10 minutes, all of the chat messages will be erased.",
        createdAt: Date.now(),
      });
      console.log("msg block is not executing");
      io.emit("chat message", message);
    }
    // console.log(message, location.country);

    if (msg) {
      if ("url" in msg) {
        image.createImage(msg.url);
        let data = {
          name: msg.name,
          msg: msg.url,
          location: location ? location.country : null,
          ip: ipAd,
          uId: msg.uId,
        };

        chat.createChat(data);
        console.log("Chat transcripted: ", data);
      } else {
        let data = {
          name: msg.name,
          msg: msg.chat,
          location: location ? location.country : null,
          ip: ipAd,
          uId: msg.uId,
        };
        chat.createChat(data);
        console.log("Chat transcripted: ", data);
      }
    }
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

  socket.on("get-peer-id", (id) => {
    console.log("get-peer-id ", id);
    io.emit("get-peer-id", id);
  });

  socket.on("call-close", (action) => {
    io.emit("call-close", action);
  });

  socket.on("all-mic", (action) => {
    io.emit("all-mic", action);
  });

  // after receive call on both party mic
  socket.on("all-mic-on", (action) => {
    io.emit("all-mic-on", action);
  });

  socket.on("connects", function () {
    connectCounter++;
    console.log("Total Connected User: ", connectCounter);
    io.emit("total-user", connectCounter);
  });

  socket.on("disconnects", function () {
    connectCounter--;
    console.log("Total Connected User: ", connectCounter);
    io.emit("total-user", connectCounter);
  });

  socket.on("social-post", (post) => {
    social.createPost(post);
    io.emit("social-post");
  });

  socket.on("social-post-delete", (id) => {
    social.deletePost(id);
    io.emit("social-post");
  });

  socket.on("get-all-users", () => {
    user.getAllUsers(io);
  });

  require("./app/events/db.internal")(socket, io);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
