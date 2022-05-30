const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://mekptmowyiidqr:40270cef32e5daf490f0de98b00a5526834f3ce9bb556d37c06c58d4d377d986@ec2-35-168-194-15.compute-1.amazonaws.com:5432/d397c3uikct331",
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// !below code is for reset all the new data/model of database without
// removing existing data

// sequelize.sync({ force: false, alter: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let db = {};

const Image = require("../model/images.model")(sequelize);
const Chat = require("../model/allChat.model")(sequelize);
const Social = require("../model/social.model")(sequelize);
const User = require("../model/user.mode")(sequelize);
const Time = require("../model/timetracking.model")(sequelize);
const Fcm = require("../model/fcmTokens")(sequelize);
const Admin = require("../model/admin.model")(sequelize);

db.Image = Image;
db.Chat = Chat;
db.Social = Social;
db.User = User;
db.Time = Time;
db.Fcm = Fcm;
db.Admin = Admin;

// relation

// rln btn user and social post
db.User.hasMany(db.Social, {
  foreignKey: "userId",
});
db.Social.belongsTo(db.User);
// rln btn user and social post
db.User.hasMany(db.Admin, {
  foreignKey: "userId",
});
db.Admin.belongsTo(db.User);
// rln btn user and fcm token
db.User.hasMany(db.Fcm);
db.Fcm.belongsTo(db.User);

db.sequelize = sequelize;

module.exports = db;
