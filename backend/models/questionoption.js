import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const QuestionOption=sequelize.define("QuestionOption",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    question_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    option_text:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    is_correct:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    tableName:"question_options",
    timestamps:false
});

export default QuestionOption;