const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Chat = sequelize.define("Chat", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return Chat;
};
