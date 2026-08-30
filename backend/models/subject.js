import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const Subject=sequelize.define("Subject",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    subject_code:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
},{
    tableName:"subjects",
    timestamps:true
});

export default Subject;