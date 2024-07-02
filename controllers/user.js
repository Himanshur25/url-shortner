const user = require("../models/user");
const { v4: uuidV4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleCreateUser(req, res) {
  const { name, email, password } = req.body;
  await user.create({ name, email, password });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const result = await user.findOne({ email, password });
  if (!result) {
    return res.render("login", {
      error: "Invalid Credentials",
    });
  }
  const sessionId = uuidV4();
  setUser(sessionId, result);
  res.cookie("id", sessionId);
  return res.redirect("/");
}

module.exports = { handleCreateUser, handleUserLogin };
