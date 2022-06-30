const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");


//default profilepic
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";

// check the username not include @
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    if (username.length < 3) return res.status(401).send("Invalid");

    if (!regexUserName.test(username)) return res.status(401).send("Invalid");

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (user) return res.status(401).send("Username Already Taken");

    return res.status(200).send("username available");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

router.post("/", async (req, res) => {
  const { name, number, password, username, address } = req.body.data;

  if (password.length < 6) {
    return res.status(401).send("password must be atleast 6 characters");
  }

  try {
    let user;
    user = await UserModel.findOne({ username: username.toLowerCase() });

    if (user) return res.status(401).send("User Already Register");

    user = new UserModel({
      name,
      username: username.toLowerCase(),
      password,
      phoneNumber: number,
      address,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save()

    const payload = { userId: user._id };

    // sign the jsonWebToken and it expire in 2days
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
    // console.log(user);

    // return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

module.exports = router;
