const express = require("express");
const router = express.Router();
const { handleCreateUser, handleUserLogin } = require("../controllers/user");

router.post("/", handleCreateUser);
router.post("/login", handleUserLogin);

module.exports = router;
