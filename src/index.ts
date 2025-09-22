import express from 'express';
import cors from 'cors';
import router from './routes/ROUTES';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

//ROUTER
app.use("/api",router);

app.listen(port, () => {
    console.log(`Server is running on port at http://localhost:${port}`);
});





