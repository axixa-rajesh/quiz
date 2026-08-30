import express from "express";
import {login,me} from "../controllers/authcontroller.js";
import {authMiddleware} from "../middlewares/authmiddleware.js";

const router=express.Router();

router.post("/login",login);

router.get("/me",authMiddleware,me);

export default router;