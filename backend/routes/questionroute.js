import express from "express";
import { createQuestion } from "../controllers/questioncontroller.js";
import { checkRole } from "../middlewares/rolemiddleware.js";

const router=express.Router();
router.post("/questions",checkRole(["admin"]),createQuestion);

export default router;