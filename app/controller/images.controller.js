const db = require("../initialize/db.initialize");
const Image = db.Image;

exports.createImage = async (req, res) => {
  try {
    const response = await Image.create({
      url: req.body.url,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send({ message: `Error! while in createImage() ${error}` });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const response = await Image.findAndCountAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send({ message: "Error! while in getAllImages()" });
  }
};
