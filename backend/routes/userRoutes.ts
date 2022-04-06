import express, { Request, Response } from "express";

import { signupController } from "../controllers/auth/Signup";

const Router = express.Router();

Router.get("/").post("/signup", signupController);

export default Router;
