import db from "../models/index.js";

const {QuizFormat} = db;

export const getAllFormatsService=async()=>{
    return await QuizFormat.findAll();
};

export const createFormatService = async(formatData)=>{
    const {name,option_count,marks_per_question,negative_marking}=formData;

    if(!name || !option_count){
        throw new Error("Format 'name' and 'option_count'are required");
    }
    return await QuizFormat.create({
        name,
        option_count,
        marks_per_question:marks_per_question || 1,
        neagtive_marking:neagtive_marking || 0
        });
    };

    export const seedQuizFormatsService=async()=>{
       const sampleFormats=[
        {name:"Standard 4-Option MCQ",option_count:4,marks_per_question:1,neagtive_marking:0},
        {name:"True/False (2-Option)",option_count:2,marks_per_question:1,neagtive_marking:0},
        {name:"Competitive MCQ",option_count:4,marks_per_question:1,neagtive_marking:0.25}
            ];
        const existingCount=await QuizFormat.count();
        if(existingCount === 0){
            await QuizFormat.bulkCreate(sampleFormats);
            return {message:"Sample quiz formats seeded successfully",formats:sampleFormats};
        }
        return {message:"Formats already exist in db"};
};