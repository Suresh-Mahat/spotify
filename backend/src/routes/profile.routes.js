const express = require("express");
const profileController = require('../controllers/profile.controller')
const isValidUser = require('../middlewares/auth.middleware')
const profileRouters = express.Router();

profileRouters.get("/showProfile",isValidUser,profileController.showProfile);
profileRouters.post('/createProfile',isValidUser,profileController.createProfile);
profileRouters.patch('/editProfile',isValidUser,profileController.editProfile);


module.exports = profileRouters;

