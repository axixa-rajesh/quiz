'use strict' ;

/**@type {import ('sequelize-cli').Migration} */
module.exports={
    async up(queryInterface,Sequelize){
        await queryInterface.createTable('QuizQuestions',{
            id:{
                allowNull:false,
                primaryKey:true,
                type:Sequelize.STRING
            },
            quiz_id:{
                type:Sequelize.STRING,
                allowNull:false,
                references:{
                    model:'Quizzes',
                    key:'quiz_id'
                },
                onDelete:'CASCADE',
                onUpdate:'CASCADE'
            },
            question_id:{
                type:Sequelize.STRING,
                references:{
                    model:'Questions',
                    key:'question_id'
                },
                onDelete:'CASCADE',
                onUpdate:'CASCADE'
            },
            marks:{
                type:Sequelize.INTEGER,
                defaultValue:1
            },
            negative_marks:{
                type:Sequelize.FLOAT,
                defaultValue:0.0
            },
            display_order:{
                    type:Sequelize.INTEGER,
                    defaultValue:1
            },
            createdAt:{
                type:Sequelize.DATE,
                allowNull:false
            },
            updatedAt:{
                 type:Sequelize.DATE,
                allowNull:false
            }
        });
        await queryInterface.addConstraint('QuizQuestions', {
            fields: ['quiz_id', 'question_id'],
            type: 'unique',
            name: 'unique_question_per_quiz'
            });
          },

          async down(queryInterface,Sequelize){
            await queryInterface.dropTable('QuizQuestions');
          }
    }
