const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Music title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    songUrl: {
      type: String,
      required: [true, "Audio source URL is required"],
      trim: true,
    },
    coverImage: {
      type: String,
      default: "https://example.com/default-cover.jpg",
    },
    
    // CHANGED: Ab yeh direct User ke bajaye Profile Model ko reference karega
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile", // <-- Aapke Profile model ka naam string me yahan aayega
      required: [true, "Every song must be linked to an artist profile"],
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

songSchema.index({ title: "text", artist: 1 });

const SongModel = mongoose.model("Song", songSchema);
module.exports = SongModel;