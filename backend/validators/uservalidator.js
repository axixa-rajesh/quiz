export const validateUser=(req,res,next)=>{
    const{email, password,status,role,name}=req.body;
    if(
        !email ||
        !password||
        !status||
        !role||
        !name
    ){
        return res.status(400).json({
            message:"All fields are required"
        });
    }

    if(!email.includes("@")){
        return res.status(400).json({
            message:"Invalid email"
        });
    }
    if(password.length<6){
        return res.status(400).json({
            message:"Password must be 6 characters"
        });
    }
    const validRoles=[
        "admin",
        "teacher",
        "student"  
    ];
    if(!validRoles.includes(role)){
        return res.status(400).json({
            message:"Invalid role"
        });
    }
    const validStatus=[
        "active",
        "inactive"
    ];
    if(!validStatus.includes(status)){
        return res.status(400).json({
            message:"Invalid status"
        });
    }
    next();
};