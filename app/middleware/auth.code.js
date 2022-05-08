verifyCode = (req, res, next) => {
  if (req.headers["code"] != 1379) {
    return res.status(200).send({
      message:
        "Invalid code has been provided. Middleware verifyCode() failed.",
    });
  }
  next();
};

const auth = {
  verifyCode: verifyCode,
};

module.exports = auth;
