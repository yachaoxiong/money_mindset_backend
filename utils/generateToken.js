const jwt = require("jsonwebtoken");
const config = require("../config/config");
const generateToken = id =>
  jwt.sign(
    {
      id
    },
    config.jwtSecret,
    {
      expiresIn: "7d"
    }
  );

module.exports = generateToken;