const user = require("../models/user");
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
  const token = setUser(result);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = { handleCreateUser, handleUserLogin };
