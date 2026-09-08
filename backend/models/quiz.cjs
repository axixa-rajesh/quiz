const { DataTypes } = require('sequelize');

const dbModule = require('../config/db.js');
const sequelize = dbModule.default || dbModule.sequelize || dbModule;

const Quiz = sequelize.define('Quiz', {
    quiz_id: { 
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    topic: {
        
        type: DataTypes.STRING,
        defaultValue: 'General'
    },
    subject: {
        type: DataTypes.STRING,
        defaultValue: 'General'
    }
}, {
    tableName: 'quizzes',
    timestamps: true
});

module.exports = Quiz;