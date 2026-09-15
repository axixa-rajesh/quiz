import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token"
            });
        }

        const token = authHeader.replace("Bearer ", "").trim();

        console.log("TOKEN RECEIVED:", token);
        console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED USER:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};