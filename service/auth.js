const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const API_KEY = process.env.AUTH_SECRET_KEY;

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    API_KEY
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, API_KEY);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
