import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const db = require("../models/index.cjs");

const User = db.User;

export const loginService = async (email, password) => {
    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const match = await bcrypt.compare(
        password,
        user.password_hash || user.password
    );

    if (!match) {
        throw new Error("Invalid Password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET || "default_secret_key",
        {
            expiresIn: "1h"
        }
    );

    return token;
};