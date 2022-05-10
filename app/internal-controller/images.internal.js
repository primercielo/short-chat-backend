// without relation controller

const db = require("../initialize/db.initialize");
const Image = db.Image;

exports.createImage = async (url) => {
  try {
    const response = await Image.create({
      url: url,
    });
    console.log("Image URL created: ", response);
  } catch (error) {
    console.log({ message: `Error! while in createImage() ${error}` });
  }
};
