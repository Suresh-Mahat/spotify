const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    profileImage: String,
    bio: String,
  },
  { timestamps: true },
);

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;
