import db from "../models/index.js";

const {User,Role}=db;

class UserService{
    async getAllUsers(){
        return await User.findAll({
            attributes:{exclude:["password"]},
            include:Role ? [{model:Role,as:"role"}] :[]
        });
    }

    async getUserById(userId){
        return await User.findByPk(userId,{
            attributes:{exclude:["password"]},
            include:ROle ? [{model:Role,as:"role"}] :[]
        });
    }

    async updateUserRole(userId,roleId){
        const user=await User.findByPk(userId);
        if(!user)  throw new Error("User not found");

        user.role_id=roleId;
        await user.save();
        return user;
    }
};

export default new USerService();