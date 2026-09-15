import { checkRequired } from "../validators/commonvalidator.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { validateQuestionOptions } from "../utils/validateOptions.js";
import db from "../models/index.cjs";

const { Question, sequelize } = db;

export const createQuestion = async (req, res) => {
    try {
        const error = checkRequired(
            ["question_text", "topic_id"],
            req.body
        );

        if (error) {
            return errorResponse(res, error);
        }

        const { question_text, topic_id, options } = req.body;

        if (!options) {
            return errorResponse(
                res,
                "Question options are required"
            );
        }

        const validation = validateQuestionOptions(
            options,
            "MCQ"
        );

        if (!validation.isValid) {
            return errorResponse(
                res,
                validation.message
            );
        }

     const question = await Question.create({
        question_text,
        topic_id
      });

        // Save question options
        for (let i = 0; i < options.length; i++) {

            const option = options[i];

            const label = String.fromCharCode(65 + i);

            await sequelize.query(
            `INSERT INTO question_options
            (question_id, option_text, is_correct)
            VALUES (?, ?, ?)`,
            {
                replacements: [
                    question.id,
                    option.text,
                    option.isCorrect === true ||
                    option.is_correct === true
                ]
                });
        }

        return successResponse(
            res,
            {
                question,
                options
            },
            "Question and options created successfully"
        );

    } catch (error) {

        console.error("Create Question Error:",error);

        return errorResponse(res,error.message);
    }
};

