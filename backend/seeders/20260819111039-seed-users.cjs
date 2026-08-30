'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [
        {
        user_id:1,
        full_name: 'Admin User',
        email:'admin@quiz.com',
        passwordhash:'adminpassword123',
        role_id:1,
        status:'active',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        user_id:2,
        full_name: 'Rahul Sharma',
        email: 'rahul@student.com',
        passwordhash: 'studentpassword123',
        role_id: 2, 
        status:'active',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        user_id: 3,
        full_name: 'Priya Verma',
        email: 'priya@student.com',
        passwordhash: 'studentpassword123',
        role_id: 2, // STUDENT Role
        status:'active',
        createdAt: new Date(),
        updatedAt: new Date()
       }
    ], {ignoreDuplicates:true});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
