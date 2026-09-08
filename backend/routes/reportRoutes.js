import express  from "express";
import { 
  getDashboardSummary, 
  getQuizReportData, 
  getSubjectTopicReportData, 
  getStudentAccuracyReport 
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/dashboard-summary', getDashboardSummary);
router.get('/quiz-report', getQuizReportData);
router.get('/subject-topic-report', getSubjectTopicReportData);
router.get('/student-accuracy/:userId', getStudentAccuracyReport);

export default router;