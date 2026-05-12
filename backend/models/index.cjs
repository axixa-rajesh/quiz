import User from './user.js';
import Quiz from './quiz.js';
import QuizAttempt from './quizAttempt.js';
import AttemptAnswer from './attemptanswer.cjs';
import AuditLog from './auditlog.cjs';

User.hasMany(QuizAttempt,{foreignKey:"user_id"});
QuizAttempt.belongsTo(User,{foreignKey:"user_id"});

Quiz.hasMany(QuizAttempt,{foreignKey:"quiz_id"});
QuizAttempt.belongsTo(Quiz,{foreignKey:"quiz_id"});

QuizAttempt.hasMany(AttemptAnswer,{foreignKey:"attempt_id"});
AttemptAnswer.belongsTo(QuizAttempt,{foreignKey:"attempt_id"});