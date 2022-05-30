const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Admin = sequelize.define("Admin", {
    postedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    post: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Admin;
};
