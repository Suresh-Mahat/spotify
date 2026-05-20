const mongoose = require("mongoose");

const songInteractionSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toSong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },
    edgeType: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true }
);

// Strict Rule: Unique index combination so one user can create only ONE edge per song
interactionEdgeSchema.index({ fromUser: 1, toSong: 1 }, { unique: true });

const songInteractionModel = mongoose.model("songInteraction", interactionEdgeSchema);
module.exports = songInteractionModel;