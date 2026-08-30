import db from "../models/index.js";
import { 
    getNextAttemptNumber, 
    calculateAttemptScore, 
    applyFormatFieldVisibility 
} from "../utils/quizHelpers.js";

const { QuizAttempt, UserAnswer, Quiz } = db;

export const createQuizService = async (data) => {
    return { message: "Quiz created successfully" };
};

export const submitQuizService = async (submissionData) => {
    const { user_id, quiz_id, answers } = submissionData;

    const quiz = await Quiz.findByPk(quiz_id);
    const formatId=quiz ? quiz.formatId:1;
    const attemptNumber = await getNextAttemptNumber(user_id, quiz_id);
    const totalScore = await calculateAttemptScore(quiz_id, answers);

    const attempt = await QuizAttempt.create({
        user_id,
        quiz_id,
        attempt_number: attemptNumber,
        score: totalScore,
        submitted_at: new Date()
    });

    if (UserAnswer) {
        for (let ans of answers) {
            await UserAnswer.create({
                attempt_id: attempt.id,
                question_id: ans.question_id,
                selected_option_id: ans.selected_option_id
            });
        }
    }

    let responseData = {
        attempt_id: attempt.id,
        attempt_number: attemptNumber,
        score: totalScore,
        answers: answers
    };

    return applyFormatFieldVisibility(format_id, responseData);
};