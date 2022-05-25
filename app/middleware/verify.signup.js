const db = require("../initialize/db.initialize");

const User = db.User;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        res.status(200).json({ error: "Email is already in use." });
        return;
      }

      // if new email provided then proceed to go next
      next();
    })
    .catch((error) => {
      res.status(200).send(error.message);
    });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
