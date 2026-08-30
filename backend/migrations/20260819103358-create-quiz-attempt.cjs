'use st
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('quiz_attemts', {
     id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,type:DataTypes.INTEGER
     },
     user_id:{
      type:Sequelize.INTEGER,
      alloNull:false
     },
     quiz_id:{
      type: Sequelize.INTEGER,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_questions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      percentage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quiz_attempts');
  }
};
    

  