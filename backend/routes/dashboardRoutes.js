import express from 'express';
import {getDashboardSummary,getQuestionWiseAccuracy,
    getDifficultQuestions,getUserPerformance} from 
"../controllers/dashboardController.js"; 

const router=express.Router();

router.get("/summary",getDashboardSummary);

router.get("/question-accuracy",getQuestionWiseAccuracy);

router.get("/difficult-questions",getDifficultQuestions);

router.get("/user-performance",getUserPerformance);

export default router;