import express from 'express';
import cors from 'cors';
import routerUsers from './routes/RouterUsers';
import routerRoles from './routes/routesRoles';
import routerProject from './routes/RouterProject';
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
app.use("/api",routerUsers);
app.use("/api",routerRoles);
app.use("/api",routerProject)

app.listen(port, () => {
    console.log(`Server is running on port at http://localhost:${port}`);
});





