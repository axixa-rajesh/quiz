import db from "../models/index.js";
import AttemptAnswer from "../models/attemptanswer.js";
import AuditLog from "../models/auditlog.js";
import sequelize from "../config/db.js";


const { User, Quiz, QuizAttempt } = db;

export const getAnswerReview=async(attemptId)=>{
    const answers=await AttemptAnswer.findAll({
        where:{
            attempt_id:attemptId
        },
        attributes:[
            "id",
            "question_id",
            "selected_option_id",
            "is_correct",
            "marks_awarded",
            "answered_at"
        ]
    });
    return answers;
}

export const getResults = async () => {
    return await QuizAttempt.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "name", "email"]
            },
            {
                model: Quiz,
                attributes: ["id", "title"]
            }
        ]
    });
};

export const getLeaderboard = async () => {
    return await QuizAttempt.findAll({
        include: [
            {
                model: User,
                attributes: ["name"]
            },
            {
                model: Quiz,
                attributes: ["title"]
            }
        ],
        order: [["score", "DESC"]],
        limit: 10
    });
};

export const getUserHistory = async (userId) => {
    return await QuizAttempt.findAll({
        where: {
            user_id: userId
        },
        include: [
            {
                model: User,
                attributes: ["name"]
            },
            {
                model: Quiz,
                attributes: ["id", "title"]
            }
        ]
    });
};

export const getResultByAttemptId = async (attemptId) => {
    const transaction = await sequelize.transaction();

    try{
    const result = await QuizAttempt.findOne({
        where: {
            id: attemptId
        },
        include: [
            {
                model: User,
                attributes: ["id", "name", "email"]
            },
            {
                model: Quiz,
                attributes: ["id", "title"]
            }
        ],
        transaction
    });

    if (!result) {
        throw new Error("Result not found");
    }

    await AuditLog.create({
    action: `Result viewed for attempt ${attemptId}`
        },
        {transaction}
    );

    const passMark = 50;

    const response={
        attemptId: result.id,
        student: result.User?.name || result.user?.name || result.user?.name,
        quiz: result.Quiz?.title || result.quiz?.title || result.quiz?.title,
        score: result.score,
        status: result.score >= passMark ? "Passed" : "Failed"
    };

        await transaction.commit();
        return response;
    }catch(error){
        await transaction.rollback();
        throw error;
    }
};
