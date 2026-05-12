//login logic
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.cjs";

export const loginService=async(email,password)=>{
    const user=await User.findOne({
        where:{email}
    });

    if(!user){
        throw new Error("User not found");
    }
    const match=await bcrypt.compare(
        password,
        user.password_hash
    );
    if(!match){
        throw new Error("Invaid Password");
    }
    const token=jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"id"
        }
    );
    return token;
}