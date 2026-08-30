'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Quizzes',{
      quiz_id:{
        allowNull:false,
        type:Sequelize.STRING,
        primaryKey:true
      },
      createdAt:{allowNull:false,type:Sequelize.DATE},
      updatedAt:{allowNull:false,type:Sequelize.DATE}
    
  });     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Quizzes');
  }
};
