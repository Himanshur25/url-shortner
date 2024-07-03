const jwt = require("jsonwebtoken");
const uniqueKey = "himanshu@hi.2$.com";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    uniqueKey
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, uniqueKey);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
