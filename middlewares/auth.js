const { getUser } = require("../service/auth");

//Authentications
function checkUserForAuthentication(req, res, next) {
  const cookieToken = req.cookies?.token;
  req.user = null;
  if (!cookieToken) {
    return next();
  }
  const token = cookieToken;
  const user = getUser(token);
  req.user = user;
  return next();
}

//Authorizations
function accessToUser(roles = []) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user?.role)) {
      return res.end("Unauthorized");
    }
    return res.render("home");
  };
}

module.exports = { checkUserForAuthentication, accessToUser };
