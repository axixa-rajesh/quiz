import db from "../models/index.js";

const { Quiz, QuizAttempt,AttemptAnswer,User } = db;

export const getUserPerformance = async () => {

    const attempts = await QuizAttempt.findAll({
        attributes: [
            "user_id",
            "score",
            "result_status"
        ],
        include: [
            {
                model: User,
                attributes: ["id", "name"]
            }
        ]
    });

    const userMap = {};

    attempts.forEach((attempt) => {

        const userId = attempt.user_id;

        if (!userMap[userId]) {
            userMap[userId] = {
                user_id: userId,
                name: attempt.User?.name || attempt.user?.name || "Unknown",
                total_attempts: 0,
                total_score: 0,
                passed_attempts: 0
            };
        }

        userMap[userId].total_attempts++;

        userMap[userId].total_score += Number(
            attempt.score || 0
        );

        if (attempt.result_status === "Passed") {
            userMap[userId].passed_attempts++;
        }
    });

    return Object.values(userMap).map((user) => ({
        user_id: user.user_id,
        name: user.name,
        total_attempts: user.total_attempts,
        average_score: Number(
            (
                user.total_score /
                user.total_attempts
            ).toFixed(2)
        ),
        passed_attempts: user.passed_attempts,
        pass_rate: `${Number(
            (
                (user.passed_attempts /
                    user.total_attempts) *
                100
            ).toFixed(2)
        )}%`
    }));
};

export const getDifficultQuestions=async()=>{
    const answers=await AttemptAnswer.findAll({
        attributes:[
            "question_id",
            "is_correct"
        ]
    });
    const questionMap = {};

    answers.forEach((answer) => {
        const questionId = answer.question_id;

        if (!questionMap[questionId]) {
            questionMap[questionId] = {
                question_id: questionId,
                total_answers: 0,
                correct_answers: 0
            };
        }

        questionMap[questionId].total_answers++;

        if (answer.is_correct) {
            questionMap[questionId].correct_answers++;
        }
    });

    return Object.values(questionMap)
        .map((question) => ({
            ...question,
            accuracy: Number(
                (
                    (question.correct_answers / question.total_answers) * 100
                ).toFixed(2)
            )
        }))
        .filter((question) => question.accuracy < 50)
        .sort((a, b) => a.accuracy - b.accuracy);
};


export const getQuestionWiseAccuracy=async()=>{
    const answers=await AttemptAnswer.findAll({
        attributes:[
            "question_id",
            "is_correct"
        ]
    });

    const questionMap={};

    answers.forEach((answer)=>{
        const questionId=answer.question_id;

        if(!questionMap[questionId]){
            questionMap[questionId]={
                question_id:questionId,
                total_answers:0,
                correct_answers:0
            };
        }
        questionMap[questionId].total_answers++;

        if(answer.is_correct){
            questionMap[questionId].correct_answers++;
        }
    });
    return Object.values(questionMap).map((question)=>({
        ...question,
        accuracy:Number(
            (
                (question.correct_answers/question.total_answers)*100
            ).toFixed(2)
        )
    }));
};

export const getDashboardSummary = async () => {

    const total_quizzes = await Quiz.count();

    const total_attempts = await QuizAttempt.count();

    const attempts = await QuizAttempt.findAll({
        attributes: ["score"]
    });

    const total_score = attempts.reduce(
        (sum, attempt) => sum + Number(attempt.score || 0),
        0
    );

    const average_score =
        total_attempts > 0
            ? Number((total_score / total_attempts).toFixed(2))
            : 0;

    const passed_attempts = await QuizAttempt.count({
        where: {
            result_status: "Passed"
        }
    });

    const pass_rate =
        total_attempts > 0
            ? Number(
                ((passed_attempts / total_attempts) * 100).toFixed(2)
            )
            : 0;

    return {
        total_quizzes,
        total_attempts,
        average_score,
        pass_rate: `${pass_rate}%`
    };
};
