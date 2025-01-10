import express from "express";
import { registerUserController } from "../controllers/user.controller.js";


const userRoute = express.Router();

userRoute.post("/register", registerUserController);


export default userRoute;