const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(403).send({
        status: "FAILED",
        data: { error: "User not authorized" },
      });
    }
    const decodedToken = jwt.verify(token, secret);
    req.member_id = decodedToken;
    next();
  } catch (error) {
    res.status(error?.status || 403).send({
      status: "FAILED",
      data: { error: error?.message || error || "User not authorized" },
    });
  }
};
