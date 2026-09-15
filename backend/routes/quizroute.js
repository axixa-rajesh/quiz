import express from "express";
import {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    mapQuestionToQuiz
} from "../services/quizservice.js";

const router = express.Router();

router.post("/quizzes", createQuiz);

router.get("/quizzes", getAllQuizzes);

router.get("/quizzes/:id", getQuizById);

router.post("/quizzes/:id/questions", mapQuestionToQuiz);

export default router;