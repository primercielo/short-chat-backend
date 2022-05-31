const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Auth = sequelize.define("Auth", {
    block: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
  return Auth;
};
