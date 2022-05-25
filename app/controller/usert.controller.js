const db = require("../initialize/db.initialize");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const credential = require("../config/config");

function makeHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function compare(password, hash) {
  return bcrypt.compareSync(password, hash);
}

exports.createUser = async (req, res) => {
  console.log("Hashed password: ", makeHash(req.body.password));

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: makeHash(req.body.password),
      imgURL: req.body.imgURL,
      admin: req.body.admin ? req.body.admin : false,
    });
    console.log({ message: `User successfully created ${user}` });

    res.status(200).send({ message: "User successfully created" });
  } catch (error) {
    res.status(200).send({ error: `Error! while in getAllChat(), ${error}` });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(200).send({ error: `User not found.` });
    }
    // console.log(user);
    if (!compare(req.body.password, user.password)) {
      res.status(200).send({ accessToken: null, error: "Invalid Password" });
    }

    let token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      credential.SECRET,
      { expiresIn: "48h" }
    );

    if (compare(req.body.password, user.password)) {
      res.status(200).send({
        id: user.id,
        name: user.name.toLowerCase(),
        imgURL: user.imgURL,
        admin: user.admin,
        accessToken: token,
      });
    }
  } catch (error) {
    res.status(200).send({ error: `Error! while signing in. ${error}` });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const response = await User.findAndCountAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send({ message: "Error! while in getAllChat()" });
  }
};
