'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    name: DataTypes.STRING,
    email:{
       type: DataTypes.STRING,
       allowNull: false,
       unique: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false       
    },
    role: {
    type: DataTypes.STRING,
    allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName:"users",
    timestamps:true
  });

  return User;
};