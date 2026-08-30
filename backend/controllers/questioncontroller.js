import Question from "../models/question.cjs";
import { checkRequired } from "../validators/commonvalidator.js";
import { successResponse,errorResponse } from "../utils/response.js";

export const createQuestion=async(req,res)=>{
    try{
        const error=checkRequired(["title","difficulty"],req,body);
        if(error){
        return errorResponse(res,error);
       }
    const question=await Question.create(req.body);
    return successResponse(res,question,"Question created");
}catch(error){
    return errorResponse(res,err.message || "Failed to create question", 500);
    }
};