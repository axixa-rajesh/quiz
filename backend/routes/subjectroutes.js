import express from "express";
import {createSubject,getSubjects,getSubjectById} from "../controllers/subjectcontroller.js";

const router=express.Router();

router.get("/",getSubjects);

router.post("/",createSubject);

router.get("/:id",getSubjectById);

export default router;