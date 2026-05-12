import express from "express";

const router=express.Router();

router.get("/roles",getRoles);

export default router;