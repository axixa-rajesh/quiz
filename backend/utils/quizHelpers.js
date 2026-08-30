import db from "../models/index.js";

const { QuizAttempt, QuizQuestion, QuestionOption } = db;

export const getNextAttemptNumber = async (userId, quizId) => {
    const previousAttemptCount = await QuizAttempt.count({
        where: {
            user_id: userId,
            quiz_id: quizId
        }
    });

    return previousAttemptCount + 1;
};

export const calculateAttemptScore = async (quizId, answers = []) => {
    let totalScore = 0;

    for (const ans of answers) {

        const correctOption = await QuestionOption.findOne({
            where: {
                question_id: ans.question_id,
                is_correct: true
            }
        });

        const quizQuestion = await QuizQuestion.findOne({
            where: {
                quiz_id: quizId,
                question_id: ans.question_id
            }
        });

        const marks = quizQuestion
            ? Number(quizQuestion.marks)
            : 0;

        if (correctOption && correctOption.option_id === ans.selected_option_id){
            totalScore += marks;
        }
    }

    return totalScore;
};

export const applyFormatFieldVisibility = (formId, rawAttemptResult) => {
    if (formId === 2) {
        delete rawAttemptResult.answers;
    }

    return rawAttemptResult;
};