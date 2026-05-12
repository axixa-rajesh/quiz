import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.routes.js";

const app=express();

app.use(express.json());

app.use('/api',userRoutes);

app.use('/auth',authRoutes);

app.use(errorHandler);

export default app;