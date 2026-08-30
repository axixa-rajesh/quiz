import express from 'express';
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errormiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import quizFormatRoutes from "./routes/quizFormat.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import subjectRoutes from "./routes/subjectroutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import optionRoutes from "./routes/optionroutes.js";

const app=express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/users',userRoutes);

app.use('/auth',authRoutes);

app.use(quizFormatRoutes);

app.use("/api/attempts",attemptRoutes);

app.use("/results",resultRoutes);

app.use("/dashboard",dashboardRoutes);

app.use("/api/subjects",subjectRoutes);

app.use("/api/v1/quiz",quizRoutes);

app.use("/api/v1",optionRoutes);

app.use(errorHandler);

export default app;
