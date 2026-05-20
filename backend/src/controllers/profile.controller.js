const mongoose = require("mongoose");
const userModel = require("../models/User.model");
const profileModel = require("../models/Profile.model");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

async function createProfile(req, res) {

  const { profileImage, bio } = req.body;
  try {
    const jwt = require("jsonwebtoken");
    const token = req.cookies.token;
    console.log("token form cookie ", token);

    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    console.log(decoded);
    const profile = await profileModel
      .findOne({ userId: id })
      .populate("userId", "name email role");

    res.json({
      name: profile.userId.name,
      email: profile.userId.email,
      role: profile.userId.role,
      bio: bio,
      profileImage: profileImage,
    });
  } catch (error) {
    console.log("error occured in create usersiginup", error.message);
    res.status(404).json({
      message: error.message,
    });
  }
}

async function editProfile(req, res) {
  res.send("hello");
}


async function showProfile(req, res) {
  try {
    const jwt = require("jsonwebtoken");
    const token = req.cookies.token;
    console.log("token form cookie ", token);

    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded id arhi ha ", decoded);
    const id = decoded.id;
   
    console.log("decoded object me id get  horhi ha", id);
    const profile = await profileModel
      .findOne({ userId:userModel.decoded.id })
      .populate("userId", "name email role");

    res.json({
      name: profile.userId.name,
      email: profile.userId.email,
      role: profile.userId.role,
      bio: "random bio here",
      profileImage: "test image",
    });
  } catch (error) {
    console.log("error occured in create usersiginup", error.message);
    res.status(404).json({
      message: error.message,
    });
  }
}


module.exports = { showProfile, createProfile, editProfile };
