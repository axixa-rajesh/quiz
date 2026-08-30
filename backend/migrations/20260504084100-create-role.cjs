'use strict';

module.exports = {

 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('roles',{

    id:{
     type:Sequelize.STRING,
     allowNull:false,
     primaryKey:true
    },

    name:{
     type:Sequelize.STRING
    },

    description:{
     type:Sequelize.STRING
    },

    status:{
     type:Sequelize.STRING
    },

    createdAt:{
     allowNull:false,
     type:Sequelize.DATE
    },

    updatedAt:{
     allowNull:false,
     type:Sequelize.DATE }

    });
 },

 async down(queryInterface) {
  await queryInterface.dropTable('roles');
    }
};