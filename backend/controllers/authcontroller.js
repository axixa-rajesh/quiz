import {loginService} from "../services/authservice.js";

export const login=async(req,res)=>{
    const{email,password}=req.body;
    const token=await loginService(email,password);
    res.json({token});
};

export const me=async(req,res)=>{
    res.json(req.user);
};
