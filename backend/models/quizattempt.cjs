const { DataTypes } = require('sequelize');

// db.js ke export format ko handles karta hai
const dbModule = require('../config/db.js');
const sequelize = dbModule.default || dbModule.sequelize || dbModule;

const QuizAttempt = sequelize.define('QuizAttempt', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quiz_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'quiz_attempts',
    timestamps: true
});

module.exports = QuizAttempt;