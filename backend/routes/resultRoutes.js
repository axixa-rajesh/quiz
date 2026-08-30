import express from "express";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import {
    getResults,
    getResultByAttemptId,
    getLeaderboard,
    getUserHistory,
    getAnswerReview
} from "../controllers/resultController.js";

const router = express.Router();

router.get("/", getResults);

router.get("/leaderboard", getLeaderboard);

router.get("/history/:userId", getUserHistory);

router.get("/:attemptId", getResultByAttemptId);

router.get("/review/:attemptId", getAnswerReview);

router.get("/history/:userId",authMiddleware, getUserHistory);

export default router;