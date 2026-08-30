import User from "./user.js";
import Quiz from "./quiz.js";
import QuizAttempt from "./quizattempt.js";
import AttemptAnswer from "./attemptanswer.js";
import AuditLog from "./auditlog.js";
import Subject from "./subject.js";
import Topic from "./topic.js";
import QuizFormat from "./quizFormat.js";
import Option from "./questionoption.js";
import QuizQuestion from "./quizquestion.js";

User.hasMany(QuizAttempt, {
    foreignKey: "user_id",
    sourceKey: "user_id"
});

QuizAttempt.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id"
});

Quiz.hasMany(QuizAttempt, {
    foreignKey: "quiz_id"
});

QuizAttempt.belongsTo(Quiz, {
    foreignKey: "quiz_id"
});

Subject.hasMany(Topic, {
    foreignKey: "subject_id",
    as: "topics"
});

Topic.belongsTo(Subject, {
    foreignKey: "subject_id",
    as: "subject"
});

Quiz.belongsTo(QuizFormat, {
    foreignKey: "format_id",
    as: "format"
});

QuizFormat.hasMany(Quiz, {
    foreignKey: "format_id"
});

const db = {
    User,
    Quiz,
    QuizAttempt,
    AttemptAnswer,
    AuditLog,
    Subject,
    Topic,
    QuizFormat,
    Option,
    QuestionOption: Option,
    QuizQuestion
};

export default db;