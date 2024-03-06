const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//yêu cầu khiến người dùng phải đăng nhập, xử lý ở đây
const requireLogin = (req, res, next) => {
  if (req.session.username) {
    return next();
  }
  res.redirect("/login"); // Chuyển hướng người dùng đến trang đăng nhập
};

//xác thực người dùng bằng jwt

module.exports = requireLogin;
