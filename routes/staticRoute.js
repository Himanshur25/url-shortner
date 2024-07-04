const express = require("express");
const url = require("../models");
const { accessToUser } = require("../middlewares/auth");
const router = express.Router();

router.get("/admin/url", accessToUser(["ADMIN"]), async (req, res) => {
  const allUrls = await url.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/", accessToUser(["ADMIN", "GUEST"]), async (req, res) => {
  const allUrls = await url.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
