import express from "express";
import { createQuizFormat,getQuizFormats,updateQuizFormat} from "../controllers/quizcontroller.js";

const router=express.Router();

router.get("/quiz-formats",getQuizFormats);

router.post("/quiz-formats",createQuizFormat);

router.put("/quiz-formats/:id",updateQuizFormat);

export default router;