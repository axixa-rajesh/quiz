import express from "express";

import {
    createQuiz,
    publishQuiz,
    getSubjects,
    createSubject,
    updateSubject,
    getTopics,
    createTopic,
    updateTopic,
    getQuestions,
    createQuestion,
    updateQuestion,
    seedFormats,
    createQuizController,
    getQuizReportController,
    submitQuizController
} from "../controllers/quizcontroller.js";

import { validateQuiz } from "../validators/quizvalidator.js";

const router = express.Router();

router.post('/quizzes', validateQuiz, createQuiz);
router.post('/quizzes/:id/publish', publishQuiz);

router.get('/subjects', getSubjects);
router.post('/subjects', createSubject);
router.put('/subjects/:id', updateSubject);

router.get('/topics', getTopics);
router.post('/topics', createTopic);
router.put('/topics/:id', updateTopic);

router.get('/questions', getQuestions);
router.post('/questions', createQuestion);
router.put('/questions/:id', updateQuestion);

router.post('/formats/seed', seedFormats);

router.post('/quiz/add-question', createQuizController);
router.get('/quiz/:quiz_id/report', getQuizReportController);

router.post('/submit', submitQuizController);

export default router;