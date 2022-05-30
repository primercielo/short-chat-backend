const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Social = sequelize.define("Social", {
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
    heart: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    happy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sensitive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
  return Social;
};
