import db from "../models/index.js";

export const ROLES={
    ADMIN:"Admin",
    TEACHER:"Teacher",
    STUDENT:"Student"
};

export const getRoleIdByName=async(roleName)=>{
    const role=await db.Role ?.findOne({
        where:{name:roleName}
    });
    return role ? role.id:null;
};

export const isValidROle=(roleName)=>{
    return Object.values(ROLES).includes(roleName);
};