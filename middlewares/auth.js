const { getUser } = require("../service/auth");

const restrictUserLogin = async (req, res, next) => {
  const userId = req.cookies.id;
  const userDetails = getUser(userId);

  if (!userId || !userDetails) {
    res.redirect("/login");
    return;
  }

  req.user = userDetails;
  next();
};

module.exports = { restrictUserLogin };
