'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
     user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING
      },
      phone:{
        type: Sequelize.STRING
      },
      passwordhash:{
        type: Sequelize.STRING
      },
      role_id:{
        type: Sequelize.STRING,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status:{
        type:Sequelize.ENUM('active','inactive'),
        defaultValue:'active'
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
    await queryInterface.dropTable('Users');
  }
};