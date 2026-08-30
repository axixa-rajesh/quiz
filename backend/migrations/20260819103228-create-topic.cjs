'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Topics', {
      topic_id: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      subject_id: {
        type: Sequelize.STRING,
        references: { model: 'Subjects', key: 'subject_id' },
        onDelete: 'CASCADE'
      },
      name: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    await queryInterface.addConstraint('Topics', {
      fields: ['subject_id', 'name'],
      type: 'unique',
      name: 'unique_topic_per_subject'
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('Topics'); }
};