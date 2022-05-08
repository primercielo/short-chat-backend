const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Image = sequelize.define("Image", {
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Image;
};
