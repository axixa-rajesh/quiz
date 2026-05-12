export const getUsers=async(req,res)=>{
    res.json({
        message:"Users fetched"
    });
};

export const createUsers=async(req,res)=>{
    res.json({
        message:"Users created"
    });
};

export const updateUsers=async(req,res)=>{
    res.json({
        message:"Users updated"
    });
};