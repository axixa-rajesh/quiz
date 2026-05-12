export const successResponse=(res,data,message)=>{
    return res.json({
        success:true,
        message,
        data
    });
}

export const errorResponse=(res,message)=>{
    return res.status(400).json({
        success:false,
        message
    });
}