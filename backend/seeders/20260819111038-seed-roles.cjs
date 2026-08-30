'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles',[
      {
        role_id:1,
        role_name:'ADMIN',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        role_id:2,
        role_name:'STUDENT',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ],{ignoreDuplicates:true});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
     
  }
};
