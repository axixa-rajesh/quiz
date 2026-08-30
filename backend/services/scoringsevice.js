export const calculateScore=(isCorrect,quizFormat,score)=>{
    if(isCorrect){
        score += 1;
    }else if(quizFormat.negative_scoring){
        score -= quizFormat.negative_marks;
    }
    if(quizFormat.immediate_feedback)
    return score;
};