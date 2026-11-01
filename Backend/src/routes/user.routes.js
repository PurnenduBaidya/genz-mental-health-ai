import userController from "../controller/user.controller.js";
import usermiddleware from "../middleware/user.middleware.js";
import express from "express";

const userRoter = express.Router();

userRoter.post("/register", userController.registeruser);
userRoter.post("/login", userController.login);
userRoter.get("/user", usermiddleware.user, userController.user);
userRoter.get("/assessment", usermiddleware.user, userController.assessment);
userRoter.post("/logout", userController.logout);

export default userRoter;
