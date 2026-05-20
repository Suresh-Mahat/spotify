const express = require("express");
const authController = require('../controllers/auth.controller')

const authUser = express.Router();

authUser.post("/createUser",authController.userSignup);
authUser.post('/loginUser',authController.userLogin);
authUser.get('/logoutUser',authController.userLogout);


module.exports =authUser;

