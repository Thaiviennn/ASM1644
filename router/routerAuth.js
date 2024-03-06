const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");

router.get("/", controller.handelDefault);
router.get("/index", controller.handleIndex);
//login
router.get("/login", controller.renderLogin);
router.post("/login", controller.handleLogin);

//register
router.get("/register", controller.renderRegister);
router.post("/register", controller.handleRegister);

module.exports = router;
