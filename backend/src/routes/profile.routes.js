const express = require("express");
const profileController = require('../controllers/profile.controller')

const profileRouters = express.Router();

profileRouters.get("/showProfile",profileController.showProfile);
profileRouters.post('/createProfile',profileController.createProfile);
profileRouters.patch('/editProfile',profileController.editProfile);


module.exports = profileRouters;

