import QuizAttempt from "../models/quizattempt.js";
import AttemptAnswer from "../models/attemptanswer.js";

export const startAttempt =async(data)=>{
 const attempt =await QuizAttempt.create({
  user_id:data.user_id,
  quiz_id:data.quiz_id
 });
 return attempt;
};

export const saveAnswer =async(attemptId,data)=>{
 const answer =await AttemptAnswer.create({
      attempt_id:attemptId,
      question_id:data.question_id,
      selected_option_id:data.option_id,
      is_correct:data.is_correct,
      marks_awarded:data.marks_awarded,
      answered_at:new Date()
 });

 return answer;
};

export const submitAttempt =async(attemptId)=>{
 const attempt =await QuizAttempt.findByPk(attemptId);
 if(!attempt){
    throw new Error( "Attempt not found" );
 }
 attempt.result_status="submitted";
 await attempt.save();
 return attempt;
};

export const getAttemptService =async(id)=>{
 const attempt = await QuizAttempt.findByPk(id,{
   include:[AttemptAnswer]
      });
 return attempt;
};
