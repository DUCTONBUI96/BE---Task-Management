import express from 'express';
import cors from 'cors';
import routerUsers from './routes/user.routes';
import routerRoles from './routes/role.routes';
import routerProject from './routes/project.routes';
import routerTask from './routes/task.routes';
import routerComment from './routes/comment.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env['CORS_ORIGIN']?.split(",") || ["http://localhost:3000"],
	credentials: true,
}));
const port = 3001;

//ROUTER
app.use("/api", routerUsers);
app.use("/api", routerRoles);
app.use("/api", routerProject);
app.use("/api", routerTask);
app.use("/api", routerComment);

app.use("/", (req, res) => {
    res.send("Server is running");
});

app.listen(port, () => {
    console.log(`Server is running on port at http://localhost:${port}`);
});






