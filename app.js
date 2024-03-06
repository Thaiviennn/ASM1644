const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const rateLimit = require("express-rate-limit");

const app = express();

//port
const port = 1234;

//giới hạn số lần truy cập
const limiter = rateLimit({
  windowMs: 60 * 1000, // Khoảng thời gian 1 phút
  max: 100, // Giới hạn 100 yêu cầu trong khoảng thời gian trên
});
//middleware
app.use(limiter);
app.use(flash());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "my-key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);

//router
const authRouter = require("./router/routerAuth");
const productRouter = require("./router/routerProduct");
const orderRouter = require("./router/routerOrder");
app.use("/", authRouter);
app.use("/index", productRouter);
app.use("/index/order", orderRouter);

app.listen(port, () => {
  console.log("Server listening on port " + `http://localhost:` + port);
});

module.exports = app;
