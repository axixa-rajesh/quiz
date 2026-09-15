import sequelize from "../config/db.js";

export const getSubjectTopicReportData = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT
        q.topic_id,
        COUNT(qa.id) AS totalAttempts,
        COALESCE(AVG(qa.score), 0) AS averageScore
      FROM questions q
      LEFT JOIN quiz_questions qq
        ON q.id = qq.question_id
      LEFT JOIN quizzes quiz
        ON qq.quiz_id = quiz.id
      LEFT JOIN quiz_attempts qa
        ON quiz.id = qa.quiz_id
      GROUP BY q.topic_id
    `);

    return results;

  } catch (error) {
    console.error("Report Service Error:", error.message);
    throw error;
  }
};

export const getDashboardSummary = async () => {
  try {
    const [[usersResult]] = await sequelize.query(`
      SELECT COUNT(*) AS totalUsers
      FROM users
    `);

    const [[quizzesResult]] = await sequelize.query(`
      SELECT COUNT(*) AS totalQuizzes
      FROM quizzes
    `);

    const [[questionsResult]] = await sequelize.query(`
      SELECT COUNT(*) AS totalQuestions
      FROM questions
    `);

    const [[attemptsResult]] = await sequelize.query(`
      SELECT COUNT(*) AS totalAttempts
      FROM quiz_attempts
    `);

    return {
      totalUsers: Number(usersResult.totalUsers),
      totalQuizzes: Number(quizzesResult.totalQuizzes),
      totalQuestions: Number(questionsResult.totalQuestions),
      totalAttempts: Number(attemptsResult.totalAttempts)
    };

  } catch (error) {
    console.error("Dashboard Summary Error:", error.message);
    throw error;
  }
};

export const getQuizReportData = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT
        qa.id AS attemptId,
        u.email AS studentName,
        q.title AS quizTitle,
        qa.score,
        qa.result_status AS status
      FROM quiz_attempts qa
      LEFT JOIN users u
        ON qa.user_id = u.id
      LEFT JOIN quizzes q
        ON qa.quiz_id = q.id
      ORDER BY qa.id DESC
    `);

    return results;

  } catch (error) {
    console.error("Quiz Report Error:", error.message);
    throw error;
  }
};