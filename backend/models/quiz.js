import sequelize from "../config/db.js";

import {DataTypes}from "sequelize";

const Quiz=sequelize.define("quizzes",{
  id:{
   type:DataTypes.INTEGER,
   primaryKey:true,
   autoIncrement:true
  },

  title:{
   type:DataTypes.STRING
  }

 }

);

export default Quiz;