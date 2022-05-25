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

// relation
User.hasMany(Social, {
  foreignKey: "userId",
});
Social.belongsTo(User);

db.Image = Image;
db.Chat = Chat;
db.Social = Social;
db.User = User;

db.sequelize = sequelize;

module.exports = db;
