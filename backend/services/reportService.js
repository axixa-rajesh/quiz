import sequelize from '../config/db.js';

export const getSubjectTopicReportData = async () => {
    // Aggregation query targeting exact base table
    const [results] = await sequelize.query(`
        SELECT 
            q.subject,
            q.topic,
            COUNT(qa.id) AS totalAttempts,
            COALESCE(AVG(qa.score), 0) AS averageScore
        FROM Quizzes q
        LEFT JOIN QuizAttempts qa ON q.id = qa.quiz_id
        GROUP BY q.subject, q.topic
    `);
    return results;
};

export const getDashboardSummary = async () => {
    const [counts] = await sequelize.query(`
        SELECT 
            (SELECT COUNT(DISTINCT user_id) FROM QuizAttempts) AS totalStudents,
            (SELECT COUNT(*) FROM Quizzes) AS totalQuizzes,
            (SELECT COUNT(*) FROM QuizAttempts) AS totalAttempts,
            (SELECT COALESCE(AVG(score), 0) FROM QuizAttempts) AS averageScore,
            (SELECT COALESCE(MAX(score), 0) FROM QuizAttempts) AS highestScore
    `);

    const data = counts[0] || {};
    return {
        totalStudents: data.totalStudents || 0,
        totalQuizzes: data.totalQuizzes || 0,
        totalAttempts: data.totalAttempts || 0,
        averageScore: parseFloat(data.averageScore || 0).toFixed(2),
        highestScore: data.highestScore || 0
    };
};