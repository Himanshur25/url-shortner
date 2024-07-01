const express = require("express");
const router = express.Router();
const {
  handleGenerateShortUrl,
  handleGetSingleUserData,
} = require("../controllers");

router.route("/").get(handleGenerateShortUrl).post(handleGenerateShortUrl);
router.route("/:id").get(handleGetSingleUserData);

module.exports = router;
