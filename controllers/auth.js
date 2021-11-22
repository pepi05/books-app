const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.json({ error: "Email is already in use" });
      }
      if (
        !req.body.password ||
        req.body.password != req.body.confirm_password
      ) {
        return res.json({
          error:
            "Password does not exist or does not match the confirm password",
        });
      }

      req.body.password = bcrypt.hashSync(req.body.password);
      user = await User.create(req.body);
      return res.json({ message: "You have successfully registred" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.json({ error: "User is not registered" });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.json({ error: "Passwords do not match" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "60m",
      });
      res.json({
        token,
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  fetchLoggedUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.json({ user });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  // fetchLoggedUser: (req, res) => {
  //   const user = User.findOne({ _id: req.params.id})
  // }
};
