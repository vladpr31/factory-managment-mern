const jwt = require("jsonwebtoken");

require("dotenv").config();
const verifyJWT = (req, res, next) => {
  const access_token = req.headers.authorization.split(" ")[1];
  if (access_token) {
    jwt.verify(
      access_token,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          //console.log("verifyJWT", err.message, "token was:", access_token);
          res.status(401).json(err.message);
        } else {
          next();
        }
      }
    );
  }
};

module.exports = verifyJWT;
