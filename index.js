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
app.use(express.urlencoded({ extended: true }));
app.use("/peerjs", peerServer);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// database
require("./app/routes/images.protected")(app);
require("./app/routes/allChat.protected")(app);
const image = require("./app/internal-controller/images.internal");
const chat = require("./app/internal-controller/allChat.internal");
const { lookup } = require("geoip-lite");
var geoip = require("geoip-country");
// end database

var ips = [];
var c = 0;
var location;
var ipAd;
var gName = null;
app.get("/:pass", (req, res) => {
  ipAd = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  location = geoip.lookup(ipAd);

  console.log(location);
  // let ip = ips.find((item) => item.ip == ipAd);
  // let index = ips.findIndex((x) => x.ip === ip.ip);
  // console.log(index);
  console.log("Requester IP: ", ipAd);
  console.log("Location: ", lookup(ipAd));

  // if (index !== -1 || index === 0) {
  //   console.log("in");
  //   ips[index].c += 1;
  //   if (ips[index].c > 6) {
  //     console.log("You are blocked for 30 sec");
  //     setTimeout(() => {
  //       ips[index].c === 0;
  //     }, 30000);
  //   }
  // } else {
  //   ips.push({ c: c++, ip: ipAd });
  // }
  // ips.push({ c: c++, ip: ipAd });
  if (
    location == null ||
    location.country == "BD" ||
    location.country == "PK"
  ) {
    console.log("Total IP list: ", ips);
    if (location.country == "PK") {
      if (gName && gName.toLowerCase() == "hina") {
        if (req.params.pass == 63952) {
          res.status(200).send(false);
        } else {
          gName = null;
          res.status(200).send(true);
        }
      } else {
        gName = null;
        res.status(200).send({
          error: `Name should be Hina ♥`,
        });
      }
    } else if (location.country == "BD") {
      console.log("Name: form logic: ", gName);
      if (gName && gName.toLowerCase() == "albion") {
        console.log("sdf");
        if (req.params.pass == 63952) {
          res.status(200).send(false);
        } else {
          gName = null;
          res.status(200).send(true);
        }
      } else {
        gName = null;
        res.status(200).send({
          error: `Name should be Albion 😉`,
        });
      }
    }
  } else {
    console.log("You can not access this site, from outside of BD or PK");
    res.status(200).send({
      error: "You can not access this site, from outside of USA or PK",
    });
  }
});

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
let connectCounter = 0;

io.on("connection", (socket) => {
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
    message.push(msg);
    // console.log(message, location.country);
    io.emit("chat message", message);

    if ("url" in msg) {
      image.createImage(msg.url);
      let data = {
        name: msg.name,
        msg: msg.url,
        location: location ? location.country : null,
        ip: ipAd,
      };

      chat.createChat(data);

      console.log("Chat transcripted: ", data);
    } else {
      let data = {
        name: msg.name,
        msg: msg.chat,
        location: location ? location.country : null,
        ip: ipAd,
      };

      chat.createChat(data);
      console.log("Chat transcripted: ", data);
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
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
