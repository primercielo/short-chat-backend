const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Fcm = sequelize.define("Fcm", {
    uId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Fcm;
};
