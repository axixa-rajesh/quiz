const {Question,QuestionOptions} = require('../models');

class QuestionService{
    async createQuestionWithOptions(questionData,optionsArray){
        const question=await Question,create(questionData);
        if(optionsArray && optionsArray.length > 0){
            const options=optionsArray.map(opt => ({...opt,question_id:question.question_id}));
            await QuestionOptions.bulkCreate(options);
        }
        return question;
    }
}

module.exports=new QuestionService();