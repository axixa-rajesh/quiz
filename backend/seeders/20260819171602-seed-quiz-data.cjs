'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Subjects', [{
      subject_id: 'sub_js_01',
      subject_code: 'JS101',
      name: 'JavaScript',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { ignoreDuplicates: true });
    
    
    await queryInterface.bulkInsert('Topics', [{
      topic_id: 'top_var_01',
      subject_id: 'sub_js_01',
      name: 'Variables',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { ignoreDuplicates: true });

    
    await queryInterface.bulkInsert('Questions', [{
      question_id: 'q_01',
      topic_id: 'top_var_01',
      question_text: 'Which keyword creates a block-scoped variable in JS?',
      marks: 2,
      difficulty_level: 'easy',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { ignoreDuplicates: true });

    
    await queryInterface.bulkInsert('QuestionOptions', [
      { option_id: 'opt_01', question_id: 'q_01', option_text: 'var', is_correct: false, createdAt: new Date(), updatedAt: new Date() },
      { option_id: 'opt_02', question_id: 'q_01', option_text: 'let', is_correct: true, createdAt: new Date(), updatedAt: new Date() },
      { option_id: 'opt_03', question_id: 'q_01', option_text: 'constant', is_correct: false, createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('QuestionOptions', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Topics', null, {});
    await queryInterface.bulkDelete('Subjects', null, {});
  }
};