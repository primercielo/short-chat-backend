const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Social = sequelize.define("Social", {
    postedBy: {
      type: DataTypes.STRING,
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
  return Social;
};
