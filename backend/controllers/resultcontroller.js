import * as resultService from '../services/resultService.js';

export const getResults=async(req,res,next)=>{
try{
    const results=await resultService.getResults();
    res.status(200).json(results);
}catch(error){
    next(error);
    }
};

export const getLeaderboard=async(req,res,next)=>{
    try{
        const leaderboard=await resultService.getLeaderboard();
    res.status(200).json(leaderboard);
    }catch(error){
        next(error);
    }
};

export const getUserHistory = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const requestedUserId = Number(req.params.userId);
        const loggedInUserId = Number(req.user.id);

        if (requestedUserId !== loggedInUserId) {
            return res.status(403).json({
                message: "You can only view your own history"
            });
        }

        const history = await resultService.getUserHistory(
            requestedUserId
        );

        res.status(200).json(history);

    } catch (error) {
        next(error);
    }
};

export const getResultByAttemptId = async (req, res, next) => {
    try {
        const result = await resultService.getResultByAttemptId(
            req.params.attemptId
        );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getAnswerReview=async(req,res,next)=>{
    try{
        const answers= await resultService.getAnswerReview(req.params.attemptId);
        res.status(200).json(answers);
    }catch(error){
        next(error);
    }
};