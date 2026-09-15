import express from "express";
import { createQuestion } from "../controllers/questioncontroller.js";

const router = express.Router();

router.post("/questions", createQuestion);

export default router;

