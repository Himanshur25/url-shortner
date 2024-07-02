const user = require("../models/user");

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
  return res.redirect("/");
}

module.exports = { handleCreateUser, handleUserLogin };
