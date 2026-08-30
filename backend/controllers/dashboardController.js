import * as dashboardService from "../services/dashboardService.js";

export const getDifficultQuestions=async(req,res,next)=>{
    try{
        const report=await dashboardService.getDifficultQuestions();
        res.status(200).json(report);
    }catch(error){
        next(error);
    }
};

export const getQuestionWiseAccuracy=async(req,res,next)=>{
    try{
        const report = await dashboardService.getQuestionWiseAccuracy();
        res.status(200).json(report);
    }catch(error){
        next(error);
    };
};

export const getDashboardSummary=async(req,res,next)=>{
    try{
        const summary = await dashboardService.getDashboardSummary();
        res.status(200).json(summary);
    }catch(error){
        next(error);
    }

};

export const getUserPerformance=async(req,res,next)=>{
    try{
        const performance=await dashboardService.getUserPerformance();
        res.status(200).json(performance);
    }catch(error){  
        next(error);
    }
};