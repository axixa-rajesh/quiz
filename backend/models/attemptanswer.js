import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

const AttemptAnswer=sequelize.define("AttemptAnswer",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
    attempt_answer_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    quiz_question_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    option_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
     is_correct:{
        type:DataTypes.BOOLEAN
     },
      marks_awarded:{
        type:DataTypes.INTEGER
      },
        answered_at:{
        type:DataTypes.DATE
        }
    },{
        tableName:'attempt_answers',
        underscored:true,
        timestamps:true
    });

export default AttemptAnswer;