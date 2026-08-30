import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const Topic=sequelize.define("Topic",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    subject_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },   
},{
    tableName:"topics",
    timestamps:true
});

export default Topic;