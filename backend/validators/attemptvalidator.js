export const validateAnswer=async(req,res,next)=>{
    if(!req.body.question_id){
        return res.status(400).json({
            message:"Question required"
        });
    }

    if(!req.body.option_id){
        return res.status(400).json({
            message:"option required"
        })
    }
    next();
}