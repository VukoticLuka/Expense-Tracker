import express from 'express';
import dotenv from 'dotenv'
import dbConnection from './dbConnect.mjs';
import router from './routes/users.mjs';

dotenv.config({path: "../.env"});

const port = process.env.PORT || 3000;

const prefix = process.env.PREFIX || "/api";

const app = express();

app.use(express.json());
app.use(prefix, router);

(async function(){
    await dbConnection();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})()