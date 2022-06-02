const db = require("../initialize/db.initialize");
const User = db.User;
const Day = db.Day;
const { Op } = require("sequelize");
const moment = require("moment");

exports.bulkCreate = async (day, io) => {
  try {
    const day = await Day.bulkCreate(day);
    io.emit("day-created");
    console.log(`Day has been successfully created.`);
  } catch (error) {
    console.log(`Error while creating day. bulkCreate()`);
  }
};

exports.sendDay = async (io) => {
  try {
    let day = [];
    const user = await User.findAll({ raw: true });
    for (let i = 0; i < user.length; i++) {
      const dayRes = await Day.findOne({
        raw: true,
        where: {
          UserId: user[i].id,
          createdAt: {
            [Op.gte]: moment().subtract(24, "hours").toDate(),
          },
        },
        order: [["createdAt", "DESC"]],
        include: [User],
      });
      if (dayRes !== null) {
        day.push(dayRes);
      }
    }
    io.emit("day", day);
    console.log("Successfully sent all the initial thumb of day", day);
    day = [];
  } catch (error) {
    console.log(`Error on sending day sendDay()`, error);
  }
};

exports.getIndividualsDay = async (id, io) => {
  try {
    const day = await Day.findAll({
      raw: true,
      where: {
        UserId: id,
        createdAt: {
          [Op.gte]: moment().subtract(24, "hours").toDate(),
        },
      },
      order: [["createdAt", "DESC"]],
      include: [User],
    });
    io.emit("individual-day", day);
    console.log(`Successfully sent the individual day`);
  } catch (error) {
    console.log(`Error on sending the individual day getIndividualsDay()`);
  }
};
