const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field!"],
  },
  email: {
    type: String,
    required: [true, "Email is required field"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required field"],
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/devm0uxsj/image/upload/v1635429090/r0ytby9st9d54cuuw6xc.png",
  },
});

module.exports = mongoose.model("User", userSchema);
