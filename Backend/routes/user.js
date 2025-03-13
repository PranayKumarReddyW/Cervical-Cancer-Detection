const express = require("express");
const { register, login, profile, logout } = require("../controllers/user");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();

// Register User Route
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", userAuth, profile);
module.exports = router;
