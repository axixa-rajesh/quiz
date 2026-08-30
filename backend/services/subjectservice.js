import db from "../models/index.js";

const {Subject,Topic}=db;

class SubjectService{
    async getAllSubjects(){
        if(Topic){
        return await Subject.findAll({
            include:[{model:Topic,as:'topics'}] 
            });
         }
         return await Subject.findAll();
    }
    async createSubject(data){
        return await Subject.create(data);
    }

    async getSubjectById(id){
        if(Topic){
            return await Subject.findByPk(id,{
                include:[{model:Topic,as:"topics"}]
            });
        }
        return await Subject.findByPk(id);
    }
}

export default new SubjectService();