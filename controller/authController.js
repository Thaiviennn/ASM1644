const product = require("../model/Product");
const { body, validationResult } = require("express-validator");
const user = require("../model/User");
const bcrypt = require("bcrypt");

let handelDefault = (req, res) => {
  res.redirect("/index");
};

let handleIndex = (req, res) => {
  product
    .find({})
    .then((products) => {
      res.render("./layouts/index.hbs", {
        message: req.flash("success"),
        products: products,
        name: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// xử lý login
let renderLogin = (req, res) => {
  res.render("login.hbs");
};

let handleLogin =
  (body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  async (req, res) => {
    try {
      const { name, password } = req.body;
      console.log(name, password);
      //tìm user trong database
      const User = await user.findOne({ name });
      console.log(User);
      if (!User || User === null) {
        console.log("d");
        return res.render("login.hbs", {
          message: "Tài khoản không tồn tại, vui lòng đăng kí",
        });
      }

      const match = await bcrypt.compare(password, User.password);
      console.log(match);
      if (match) {
        req.session.isLoggedIn = true;
        req.session.username = name;
        res.cookie("session_id", req.session.id);
        return res.redirect("/index");
      }
      return res.render("login.hbs", {
        csrfToken: req.csrfToken(),
        message: "Mật khẩu không chính xác",
      });
    } catch (error) {
      //xử lý lỗi ở đây
      console.error(error);
      return res.status(500).send("Có lỗi xảy ra");
    }
  });

let renderRegister = (req, res) => {
  const message = req.session.message;
  res.render("register.hbs", { message: message });
};

let handleRegister =
  ([
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    console.log(1);
    const error = validationResult(req);
    console.log(error.array());
    if (error.isEmpty()) {
      try {
        const { name, email, password } = req.body;
        console.log({ name, email, password });
        // Tạo một salt ngẫu nhiên
        const salt = await bcrypt.genSalt(10);

        // Mã hóa password kết hợp với salt
        const hash = await bcrypt.hash(password, salt);
        console.log(2);
        user.create({ name, email, password: hash });
        console.log(3);
        req.session.message = "Đăng kí thành công, bạn có thể đăng nhập";
        res.redirect("/login");
      } catch (err) {
        req.session.message = "Đăng kí không thành công";
      }
    } else {
      req.session.message = error.array();
    }
  });

module.exports = {
  handelDefault: handelDefault,
  handleIndex: handleIndex,
  renderLogin: renderLogin,
  handleLogin: handleLogin,
  renderRegister: renderRegister,
  handleRegister: handleRegister,
};
