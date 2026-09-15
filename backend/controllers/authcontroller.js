import { loginService } from "../services/authservice.js";

export const login = async (req, res) => {
    try {

        console.log("LOGIN BODY:", req.body);
console.log("CREATE QUESTION BODY:", req.body);
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const token = await loginService(email, password);

        res.json({
            token
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(401).json({
            message: error.message
        });
    }
};

export const me = async (req, res) => {
    res.json(req.user);
};