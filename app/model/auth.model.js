const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Auth = sequelize.define("Auth", {
    block: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    chat: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    chatInput: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    partager: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    transcript: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    day: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    call: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    online: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
  return Auth;
};
