import express from "express";
import {startQuiz,
    answerQuestion,
    submitQuizAttempt,
    getAttempt} from "../controllers/attemptcontroller.js";

const router=express.Router();

router.get('/start',startQuiz);

router.post('/start',startQuiz);

router.post('/:id/answer',answerQuestion);

router.post('/submit',submitQuizAttempt);

router.get('/:id',getAttempt);

export default router;
