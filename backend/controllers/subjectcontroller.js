import subjectService from "../services/subjectservice.js";
import { checkRequired } from "../validators/commonvalidator.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createSubject = async (req, res) => {
  try {
    const error = checkRequired(["name", "subject_code"], req.body);
    if (error) {
      return error
      Response(res, error, 400);
    }

    const subject = await subjectService.createSubject(req.body);
    return successResponse(res, subject, "Subject created successfully", 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    return successResponse(res, subjects, "Subjects retrieved successfully", 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getSubjectById=async(req,res)=>{
  try{
    const {id} = req.params;
    const subject=await subjectService.getSubjectById(id);

    if (!subject) {
      return errorResponse(res,"Subject not found",404);
    }

    return successResponse(res,subject,"Subject retrieved successfully",200);
  }catch(error){
    return errorResponse(res,error.message,500);
  }
};