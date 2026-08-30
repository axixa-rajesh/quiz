import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AttemptAnswer = sequelize.define("AttemptAnswer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    attempt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "attempt_answer_id"
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "quiz_question_id"
    },
    selected_option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "option_id"
    },
    is_correct: {
        type: DataTypes.BOOLEAN
    },
    marks_awarded: {
        type: DataTypes.INTEGER
    },
    answered_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: "attempt_answers",
    underscored: true,
    timestamps: false
});

export default AttemptAnswer;
