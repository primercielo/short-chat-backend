const db = require("../initialize/db.initialize");
const { Op } = require("sequelize");
const Fcm = db.Fcm;
const User = db.User;

exports.createFcm = async (req, res) => {
  try {
    const fcm = await Fcm.create({
      uId: req.body.uId,
      token: req.body.token,
      UserId: req.body.UserId,
    });

    res.status(200).send(fcm);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllFcm = async (req, res) => {
  const fcm = await Fcm.findAndCountAll({
    order: [["createdAt", "DESC"]],
    include: [User],
  });
  res.status(200).send(fcm);
};

exports.getUserFcm = async (req, res) => {
  const fcm = await Fcm.findAndCountAll({
    order: [["createdAt", "DESC"]],
    include: [User],
    where: { UserId: req.params.userid },
  });
  res.status(200).send(fcm);
};

exports.getExecptUserFcm = async (req, res) => {
  const fcm = await Fcm.findAndCountAll({
    where: { UserId: { [Op.ne]: req.params.userid } },
    order: [["createdAt", "DESC"]],
    include: [User],
  });
  //   console.log(fcm);
  res.status(200).send(fcm);
};

exports.destroyFcm = async (req, res) => {
  const fcm = await Fcm.destroy({ truncate: true });
  //   console.log(fcm);
  res.status(200).send(fcm);
};
