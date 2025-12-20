import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routerUsers from './routes/user.routes';
import routerRoles from './routes/role.routes';
import routerProject from './routes/project.routes';
import routerTask from './routes/task.routes';
import routerComment from './routes/comment.routes';
import authRouter from './routes/auth.routes';
import taskStatusRouter from './routes/taskStatus.routes';
import taskPriorityRouter from './routes/taskPriority.routes';
import metricRouter from './routes/metric.routes';
import { ErrorHandler } from './middleware/ErrorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ============ MIDDLEWARE ============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies
app.use(cors({
    origin: process.env['CORS_ORIGIN']?.split(",") || ["http://localhost:3000"],
	credentials: true,
}));

const port = process.env['APP_PORT'] || 3001;

// ============ ROUTES ============
// Health check (đặt trước để chỉ match exact "/")
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Auth routes (must be before protected routes)
app.use("/api", authRouter);

// User routes
app.use("/api", routerUsers);

// Other routes
app.use("/api", routerRoles);
app.use("/api", routerProject);
app.use("/api", routerTask);
app.use("/api", routerComment);
app.use("/api", taskStatusRouter);
app.use("/api", taskPriorityRouter);
app.use("/api", metricRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        message: `Route ${req.method} ${req.path} not found`,
    });
});

// ============ ERROR HANDLING ============
// Use custom error handler middleware
app.use(ErrorHandler.handle);

app.listen(port, () => {
    console.log(`Server is running on port at http://localhost:${port}`);
});






