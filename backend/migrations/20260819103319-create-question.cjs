'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Questions', {
       question_id: {
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
      },
       topic_id:{
        type:Sequelize.STRING,
        references:{model:'Topics',key:'topic_id'},
        onDelete:'CASCADE'
       },
       question_text:{
        type:Sequelize.TEXT,
        allowNull:false
      },
       marks:{
        type:Sequelize.INTEGER,
        defaultValue:1
      },
       difficulty_level:{
        type:Sequelize.ENUM('easy','medium','hard'),
        defaultValue:'easy'
      },
       createdAt:{allowNull:false,type:Sequelize.DATE},
       updatedAt:{allowNull:false,type:Sequelize.DATE}
      });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Questions');
  }
};
