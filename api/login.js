const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.post("/", async (req, res) => {
  const { username, password } = req.body.data;

  if (username.length < 3) return res.status(401).send("Invalid");

  if (!regexUserName.test(username)) return res.status(401).send("Invalid");

  if (password.length < 6)
    return res.status(401).send("Password Must Be 6 Characters");

  try {
    const user = await UserModel.findOne({
      username: username.toLowerCase(),
    }).select("+password");

    if (!user) return res.status(401).send("Invalid Credentials");

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) return res.status(401).send("Invalid Credentials");

    const payload = { userId: user._id }; // we will get userId in authMiddleware.js

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );

    // return res.json("login successfully")
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

module.exports = router;
