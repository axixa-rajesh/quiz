import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authroutes.js";
import { errorHandler } from "./middlewares/errormiddleware.js";
import userRoutes from "./routes/userroutes.js";
import settingsRoutes from "./routes/settingsRoute.js";
import reportRoutes from "./routes/reportRoutes.js";
import { connectDB } from "./config/db.js";
import questionRoutes from "./routes/questionroute.js";
import quizRoutes from "./routes/quizroute.js";

const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.use('/api', quizRoutes);

app.use('/api/settings', settingsRoutes);

app.use('/api/reports', reportRoutes);

app.use('/auth', authRoutes);

app.use('/api', questionRoutes);

app.use(errorHandler);

export default app;