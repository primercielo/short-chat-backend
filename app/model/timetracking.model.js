const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Time = sequelize.define("Time", {
    setTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  return Time;
};
