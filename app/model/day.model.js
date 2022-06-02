const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Day = sequelize.define("Day", {
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    like: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Day;
};
