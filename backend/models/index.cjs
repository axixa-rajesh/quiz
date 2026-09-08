const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const UserFactory = require('./user.cjs');
const RoleFactory = require('./role.cjs');
const QuizAttemptFactory = require('./quizattempt.cjs');

let AttemptAnswer;
try {
  AttemptAnswer = require('./attemptanswer.cjs');
} catch(e) {
  AttemptAnswer = sequelize.define('AttemptAnswer', {});
}

let User, Role, QuizAttempt;
try { User = UserFactory(sequelize, Sequelize.DataTypes); } catch(e) { User = sequelize.define('User', {}); }
try { Role = RoleFactory(sequelize, Sequelize.DataTypes); } catch(e) { Role = sequelize.define('Role', {}); }
try { QuizAttempt = QuizAttemptFactory(sequelize, Sequelize.DataTypes); } catch(e) { QuizAttempt = sequelize.define('QuizAttempt', {}); }

const Quiz = sequelize.define('Quiz', {});
const AuditLog = sequelize.define('AuditLog', {});

try { User.hasMany(QuizAttempt, { foreignKey: 'user_id' }); } catch(e){}
try { QuizAttempt.belongsTo(User, { foreignKey: 'user_id' }); } catch(e){}
try { Quiz.hasMany(QuizAttempt, { foreignKey: 'quiz_id' }); } catch(e){}
try { QuizAttempt.belongsTo(Quiz, { foreignKey: 'quiz_id' }); } catch(e){}
try { QuizAttempt.hasMany(AttemptAnswer, { foreignKey: 'attempt_id' }); } catch(e){}
try { AttemptAnswer.belongsTo(QuizAttempt, { foreignKey: 'attempt_id' }); } catch(e){}

module.exports = {
  sequelize,
  Sequelize,  
  User,
  Role,
  Quiz,
  QuizAttempt,
  AttemptAnswer,
  AuditLog
};
