import express from 'express';
import dotenv from 'dotenv'
import dbConnection from './dbConnect.mjs';
import { envPath } from './utils/pathResolver.mjs';
import { router as userRouter } from './routes/users.mjs';
import { router as authRouter } from './routes/auth.mjs';

dotenv.config({path: envPath});

const port = process.env.PORT || 3000;

const prefix = process.env.PREFIX || "/api";

const app = express();

app.use(express.json());

app.use(`${prefix}/users`, userRouter);
app.use(`${prefix}/login`, authRouter);


(async function(){
    await dbConnection();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})()

app.get("/", (req,res) => {
    return res.status(200).send({msg: "Check health done!"});
})