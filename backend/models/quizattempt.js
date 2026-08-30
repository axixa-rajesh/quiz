import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const QuizAttempt=sequelize.define("QuizAttempt",{
     id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
        },
        user_id:{
            type:DataTypes.STRING,
            allowNull:false
        },
        score:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        result_status:{
            type:DataTypes.STRING
        },
        quiz_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        tableName:"quiz_attempts",
        timestamps:false,
        underscored:true
    });
export default QuizAttempt;