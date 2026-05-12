'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('quiz_formats', { 
        id: Sequelize.INTEGER,
      type: Sequelize.STRING,
      primaryKey: true,
      
      name:Sequelize.STRING,
      description:Sequelize.STRING,
      status:Sequelize.STRING
    });
  },
     

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('quiz_formats');
  }
};
