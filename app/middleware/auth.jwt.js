const jwt = require("jsonwebtoken");
const db = require("../initialize/db.initialize");
const User = db.User;

const credential = require("../config/config");
require("dotenv").config();

verifyToken = (req, res, next) => {
  let token = req.headers["x-api-key"];

  if (!token) {
    return res.status(200).send({ error: "No token has been provided." });
  }

  jwt.verify(token, credential.SECRET, (err, decoded) => {
    if (err) {
      return res.status(200).send({
        error: "Unauthorized",
      });
    }
    req.userId = decoded.id;
    req.name = decoded.name;
    next();
  });
};

isSamePersonPOST = (req, res, next) => {
  if (req.name != req.lastName) {
    return res.status(200).send({
      error: "Unauthorized access.",
      errorDetails: `Make sure you are the right person to access this account. Because, your login credentials are different than your requested account. You are only eligible to "${req.firstName} ${req.lastName}" account`,
    });
  }
  next();
};

isSamePersonGET = (req, res, next) => {
  if (req.userId != req.params.id) {
    return res.status(200).send({
      error: "Unauthorized access.",
      errorDetails: `Make sure you are the right person to access this account. Because, your login credentials are different than your requested account. You are only eligible to "${req.firstName} ${req.lastName}" account id "${req.userId}"`,
    });
  }
  next();
};

// TODO buggy
isAdmin = (req, res, next) => {
  User.findOne({ where: { id: req.userId }, include: ["role"] }).then(
    (user) => {
      if (user) {
        if (user.role.name === "admin") {
          req.firstName = user.firstName;
          req.lastName = user.lastName;
          next();
          return;
        } else {
          res.status(403).send({
            message: "Require admin.",
          });
        }
      } else {
        res.status(403).send({
          error: "No user found or user deleted.",
        });
      }

      return;
    }
  );
};

// TODO buggy
isUserOrAdmin = (req, res, next) => {
  User.findOne({ where: { id: req.userId }, include: ["role"] }).then(
    (user) => {
      if (user) {
        if (user.role.name === "user" || user.role.name === "admin") {
          req.firstName = user.firstName;
          req.lastName = user.lastName;
          next();
          return;
        } else {
          res.status(403).send({
            message: "Require user or admin.",
          });
        }
      } else {
        res.status(403).send({
          error: "No user found or user deleted.",
        });
      }

      return;
    }
  );
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUserOrAdmin: isUserOrAdmin,
  isSamePersonPOST: isSamePersonPOST,
  isSamePersonGET: isSamePersonGET,
};

module.exports = authJwt;
