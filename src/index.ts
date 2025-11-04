import express from 'express';
import cors from 'cors';
import routerUsers from './routes/RouterUsers';
import routerRoles from './routes/routesRoles';
import routerProject from './routes/RouterProject';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

//ROUTER
app.use("/api",routerUsers);
app.use("/api",routerRoles);
app.use("/api",routerProject)

app.listen(port, () => {
    console.log(`Server is running on port at http://localhost:${port}`);
});





