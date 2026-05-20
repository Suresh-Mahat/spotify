const mongoose = require("mongoose");
const userModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

async function userSignup(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const isAlreadyLogin = await userModel.findOne({ email: email });
    if (isAlreadyLogin) {
      return res.status(401).json({
        message: "User already register",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed passord is : ", hashedPassword);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: role,
    });
    if (!user) {
      return res.status(404).json({
        message: "created failed",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User created Sucessfully",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log("error occured in create usersiginup", error.message);
    res.stattus(404).json({
      message: error.message,
    });
  }
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  const UserValid = await userModel.findOne({ email: email });
  if (!UserValid) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  console.log(UserValid);

  const isValidPassword = await bcrypt.compare(password, UserValid.password);
  console.log(UserValid.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid Creadentials",
    });
  }

  const token = jwt.sign({ id: UserValid._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "User login Sucessfully",
    UserValid: UserValid,
    token: token,
  });
}

async function userLogout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({
    message: "Logout successful",
  });
}

module.exports = { userSignup, userLogin, userLogout };
