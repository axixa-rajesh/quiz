import {Model,DataTypes} from "sequelize";

import sequelize from "../config/db.js";

class Question extends Model{}

Question.init(
 {
  hint:{
   type:DataTypes.STRING
  },

  explanation:{
   type:DataTypes.TEXT
  },

  difficulty:{
   type:DataTypes.STRING
  },

  reference_note:{
   type:DataTypes.TEXT
  }

 },

 {
  sequelize,
  modelName:"Question"
 });

export default Question;