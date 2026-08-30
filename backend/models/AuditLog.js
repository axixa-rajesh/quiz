import sequelize from "../config/db.js";
import {DataTypes}from "sequelize";

const AuditLog=sequelize.define("AuditLog",{

  id:{
   type:DataTypes.INTEGER,
   primaryKey:true,
   autoIncrement:true
  },

  action:{
   type:DataTypes.STRING
  }
},{
  tablename:"audit_log",
  timestamps:true,
  underscored:false
});
 

export default AuditLog;