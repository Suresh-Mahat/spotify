const mongoose = require("mongoose");
const SongModel = require("../models/song.model");
const profileModel = require("../models/Profile.model");
const userModel = require("../models/User.model");

async function uploadSong(req, res) {
  try {
   
    const { title, description, songUrl, coverImage } = req.body;
    const id = req.id; 

  
    const checkSongExists = await SongModel.findOne({ title: title });
    if (checkSongExists) {
      return res.status(409).json({ 
        success: false,
        message: "Song already exists",
      });
    }

   
    const profile = await profileModel.findOne({ user: id }).populate("user", "name");
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Song upload karne se pehle kripya apni profile create karein!",
      });
    }

  
    const newSong = await SongModel.create({
      title,
      description,
      songUrl,
      coverImage,
      artist: profile._id,
    });

    
    return res.status(201).json({
      success: true,
      message: "Song uploaded successfully",
      uploadSong: {
        _id: newSong._id,
        title: newSong.title,
        description: newSong.description,
        songUrl: newSong.songUrl,
        coverImage: newSong.coverImage,
        artistName: profile.user?.name, 
      },
    });

  } catch (error) {
    console.log("Error in uploadSong:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error during song upload",
      error: error.message,
    });
  }
}

async function updateSong(req, res) {
  try {
  
   const { id: songId } = req.params;
    const { title, description, songUrl, coverImage } = req.body;
    const userId = req.id; 

   console.log(songId)
    const song = await SongModel.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song doesn't exist",
      });
    }

    const profile = await profileModel.findOne({ user: userId });
    
   
    if (!profile || song.artist.toString() !== profile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Aap sirf apna hi gaana update kar sakte hain!",
      });
    }

    const updatedSong = await SongModel.findByIdAndUpdate(
      songId,
      { title, description, songUrl, coverImage },
      { new: true, runValidators: true } // { new: true } se hume updated data turant milta hai
    ).populate({
      path: "artist",
      populate: { path: "user", select: "name" }
    });


    return res.status(200).json({
      success: true,
      message: "Song updated successfully",
      data: updatedSong
    });

  } catch (error) {
    console.log("Error in updateSong:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

async function deleteSong(req, res) {
  try {
    const { id: songId } = req.params;
    const userId = req.id; 

    console.log("Deleting Song ID:", songId);

    // 1. Check if song exists
    const song = await SongModel.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song doesn't exist",
      });
    }

    // 2. Fetch current user's profile
    const profile = await profileModel.findOne({ user: userId });
    
    // 3. Security Check: Ownership verification
    if (!profile || song.artist.toString() !== profile._id.toString()) {
      return res.status(403).json({
        success: false,
        // FIXED: Message text correct kiya
        message: "Unauthorized: Aap sirf apna hi gaana delete kar sakte hain!", 
      });
    }

    // 4. FIXED: Removed req.body destructuring completely since it's a DELETE operation
    await SongModel.findByIdAndDelete(songId);

    return res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });

  } catch (error) {
    console.log("Error in deleteSong:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}


  

module.exports = { uploadSong , updateSong, deleteSong };
