const mongoose = require("mongoose");
const userModel = require("../models/User.model");
const profileModel = require("../models/Profile.model");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

async function createProfile(req, res) {
  const { profileImage, bio } = req.body;
  // verify the user
  try {
    const jwt = require("jsonwebtoken");
    const token = req.cookies.token;

    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    console.log("The decoded id is", id);
    console.log(decoded);

    const user = await userModel.findOne({ _id: id });

    const profile = await profileModel.create({
      profileImage: profileImage,
      bio: bio,
    });

    res.status(201).json({
      message: "Profile created successfully",
      Authuser: user,
      profile: profile,
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
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userIdFromToken = decoded.id;

    // 2. User ID ke help se Profile dhoondhi aur User details ko populate kiya
    const profile = await profileModel
      .findOne({ user: userIdFromToken }) // Search using User ID reference
      .populate("user", "name email role");

    // 3. Agar profile nahi milti toh error handle karein
    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: "Profile not found for this user." 
      });
    }

    // 4. Response me Profile ki ID aur baaki details bhejein
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profileId: profile._id, // <-- YEH HAI AAPKI PROFILE MODEL KI APNI UNIQUE ID
      bio: profile.bio,
      profileImage: profile.profileImage,
      user: {
        userId: profile.user?._id, // User Model ki ID
        name: profile.user?.name,
        email: profile.user?.email,
        role: profile.user?.role
      }
    });

  } catch (error) {
    console.log("Error in getUserProfile:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

module.exports = { showProfile, createProfile, editProfile };
