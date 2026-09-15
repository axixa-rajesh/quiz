import { createRequire } from "module";

const require = createRequire(import.meta.url);
const db = require("../models/index.cjs");

const Quiz = db.Quiz;

export const createQuiz = async (req, res) => {
    try {

        const { title, format_id } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Quiz title is required"
            });
        }

        const quiz = await Quiz.create({
            title,
            format_id: format_id || null
        });

        return res.status(201).json({
            message: "Quiz created successfully",
            quiz
        });

    } catch (error) {

        console.error("Create Quiz Error:", error);

        return res.status(500).json({
            message: "Failed to create quiz"
        });
    }
};


export const getAllQuizzes = async (req, res) => {
    try {

        const quizzes = await Quiz.findAll();

        return res.status(200).json({
            quizzes
        });

    } catch (error) {

        console.error("Get Quizzes Error:", error);

        return res.status(500).json({
            message: "Failed to fetch quizzes"
        });
    }
};


export const getQuizById = async (req, res) => {
    try {

        const { id } = req.params;

        const quiz = await Quiz.findByPk(id);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        return res.status(200).json({
            quiz
        });

    } catch (error) {

        console.error("Get Quiz Error:", error);

        return res.status(500).json({
            message: "Failed to fetch quiz"
        });
    }
};

export const mapQuestionToQuiz = async (req, res) => {
    try {

        const { quiz_id, question_id, marks } = req.body;

        if (!quiz_id || !question_id || marks === undefined) {
            return res.status(400).json({
                message: "quiz_id, question_id and marks are required"
            });
        }

        const [quiz] = await db.sequelize.query(
            "SELECT id FROM quizzes WHERE id = ?",
            {
                replacements: [quiz_id]
            }
        );

        if (quiz.length === 0) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        const [question] = await db.sequelize.query(
            "SELECT id FROM questions WHERE id = ?",
            {
                replacements: [question_id]
            }
        );

        if (question.length === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        await db.sequelize.query(
            `INSERT INTO quiz_questions 
            (quiz_id, question_id, marks)
            VALUES (?, ?, ?)`,
            {
                replacements: [quiz_id, question_id, marks]
            }
        );

        return res.status(201).json({
            message: "Question mapped to quiz successfully",
            quiz_id,
            question_id,
            marks
        });

    } catch (error) {

        console.error("MAP QUESTION ERROR:", error);

        return res.status(500).json({
            message: "Failed to map question to quiz",
            error: error.message
        });
    }
};