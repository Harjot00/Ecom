const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");

const createToken = (id) => {
  const payload = {
    id: id,
  };
  try {
    accessToken = sign(payload, `${process.env.SECRET}`);
  } catch (err) {
    console.log(err);
  }
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access_token"];
  if (!accessToken) {
    return res.status(400).json("User not authenticated");
  }

  try {
    const validToken = verify(accessToken, process.env.SECRET);
    if (validToken) {
      req.authenicated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { createToken, validateToken };
