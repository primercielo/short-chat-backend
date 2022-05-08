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

// !below code is for removing all the data from 'notes' and 'users' tables.
// sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let db = {};

const Image = require("../model/images.model")(sequelize);

db.Image = Image;

db.sequelize = sequelize;

module.exports = db;
