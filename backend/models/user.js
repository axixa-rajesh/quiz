import sequelize from "../config/db.js";

import {DataTypes} from "sequelize";

const User = sequelize.define("users",{
  user_id:{
   type:DataTypes.INTEGER,
   primaryKey:true,
   autoIncrement:true
  },

  full_name:{
   type:DataTypes.STRING
  },

  email:{
   type:DataTypes.STRING
  },

  password_hash:{
   type:DataTypes.STRING
  },

  role:{
   type:DataTypes.STRING
    }
 },{
   tableName:"users",
   timsestamps:false
 });

export default User;