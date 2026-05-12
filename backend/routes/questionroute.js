import express from "express";
import { createQuestion } from "../controllers/question.controller.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router=express.Router();
router.post("/questions",checkRole(["admin"]),createQuestion);

export default router;