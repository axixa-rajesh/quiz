import {Model,DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const QuizFormat=sequelize.define("QuizFormat",{
    id:{
        type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    description:DataTypes.TEXT,

    defaultDurationMinutes:{
        type: DataTypes.INTEGER,
        defaultValue: 30
    },
    allowRandomization: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    option_count:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    negative_marking:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    negative_marks:{
       type:DataTypes.FLOAT,
       defaultValue:0
    },
    immediate_feedback:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    end_feedback:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
        tableName:"QuizFormats",
        timestamps:true
    });
    
export default QuizFormat;
