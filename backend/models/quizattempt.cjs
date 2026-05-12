import { DataTypes,DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const QuizAttempt=sequelize.define("QuizAttempt",{
     id:{
        type:DataTypes.INTEGER,
        autoIncrement:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        score:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        result_status:{
            type:DataTypes.STRING
        }
    },{
        tableName:"quiz_attempts",
        timestamps:true,
        underscored:true
    });
    export default QuizAttempt;