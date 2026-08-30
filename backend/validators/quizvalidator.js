export const validateQuiz=(req,res,next)=>{
    const{
        title,format_id,start_time,end_time,questions}=req.body;
        if(!title){
            return res.status(400).json({
                message:"Title required"
            });
        }

        if(!format_id){
            return res.status(400).json({
                message:"format required"
            });
        }
        if(new Date(start_time)>=new Date(end_time)){
            return res.status(400).json({
                message:"Invalid schedule"
            });
        }
        const ids=questions.map(q=>q.question_id);
        const unique=new Set(ids);
        if(ids.length !== unique.size){
            return res.status(400).json({
                message:"Duplicate questions found"
            });
        }
        next();
}