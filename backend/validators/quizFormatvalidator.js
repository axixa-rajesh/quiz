export const validateOptionCount=(options,optionCount)=>{
    if(optionCount.length !== optionCount){
        return false;
    }
    return true;
}