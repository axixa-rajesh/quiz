'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QuestionOptions', {
      option_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      question_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'question_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      option_text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('QuestionOptions');
  }
};