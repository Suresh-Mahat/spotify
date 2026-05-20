const express = require("express");
const songController = require('../controllers/song.controller')
const verifyArtist = require('../middlewares/artist.middleware')


const songRouters = express.Router();

songRouters.post("/createSong",verifyArtist,songController.uploadSong);
songRouters.patch("/updateSong/:id",verifyArtist,songController.updateSong);
songRouters.delete('/deleteSong/:id',verifyArtist,songController.deleteSong);
// songRouters.get('/showSongs',verifyArtist,songController);


module.exports =songRouters;

