import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const QuizQuestion=sequelize.define("QuizQuestion",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    quiz_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    question_id:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    marks:{
        type:DataTypes.INTEGER,
        defaultValue:false
    }
},{
    tableName:"quizquestions",
    timestamps:true
});

export default QuizQuestion;