const mongoose = require("mongoose");
const userModel = require("../models/User.model");
const profileModel = require("../models/Profile.model");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

async function createProfile(req, res) {
  const { profileImage, bio } = req.body;
  try {
      id = req.id;
    const user = await userModel.findOne({ _id: id });
   console.log(user)
    if(!user){
      return res.status(404).json({
        message: "User not found",
      });
    }

      const checkProfile = await profileModel.findOne({ user: user._id });
   console.log(checkProfile)
    if(checkProfile){
      return res.status(404).json({
        message: "Profile already exist",
      });
    }


    
    const profile = await profileModel.create({
      user: user._id,
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
  try {
    // 1. Token se ID nikalna (Make sure aapka middleware req.id set kar raha ho)
    const idFromToken = req.id; 
    const { name, email, profileImage, bio } = req.body;

    // 2. Pehle check karein ki Profile exist karti hai ya nahi
    const checkProfile = await profileModel.findOne({ user: idFromToken });
    if (!checkProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile doesn't exist",
      });
    }

    // 3. User Model update karein (Name aur Email ke liye)
    // { new: true } lagane se hume updated data milta hai
    const updatedUser = await userModel.findByIdAndUpdate(
      idFromToken,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Profile Model update karein (Bio aur Profile Image ke liye)
    const updatedProfile = await profileModel.findOneAndUpdate(
      { user: idFromToken },         // Search Condition
      { bio, profileImage },         // Data to Update
      { new: true, runValidators: true }
    ).populate("user", "name email role");

    // 5. Final Response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        profileId: updatedProfile._id,
        bio: updatedProfile.bio,
        profileImage: updatedProfile.profileImage,
        user: {
          userId: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role
        }
      }
    });

  } catch (error) {
    console.log("Error in editProfile:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
async function showProfile(req, res) {
  try {
    
      const  id = res.id;
    const profile = await profileModel
      .findOne({ user: id }) 
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
