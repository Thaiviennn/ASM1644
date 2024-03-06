const mongodb = require("../config/mongodb");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongodb.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);
const User = new mongodb.model("User", userSchema);
module.exports = User;
