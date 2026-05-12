import Question from "../models/question.cjs";
import { checkRequired } from "../validators/commonvalidator.js";
import { successResponse,errorResponse } from "../utils/response.js";

export const createQuestion=async(req,res)=>{
    const error=checkRequired(["title","difficulty"],req,body);
    if(error){
        return errorResponse(res,error);
    }
    const question=await Question.create(req,body);

    return successResponse(res,question,"Question created");
};