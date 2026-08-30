import express from 'express';
import QuestionOption from "../models/questionoption.js";

const router = express.Router();

router.post("/options", async (req, res) => {
    try {
        const newOption = await QuestionOption.create(req.body);
        res.status(201).json(newOption);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/options/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await QuestionOption.update(req.body, { where: { id } });

        if (updated) {
            res.json({ message: "Option updated successfully" });
        } else {
            res.status(404).json({ error: "Option not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;