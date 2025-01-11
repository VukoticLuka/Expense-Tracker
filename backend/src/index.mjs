import express from 'express';
import dotenv from 'dotenv'
import dbConnection from './dbConnect.mjs';

dotenv.config({path: "../.env"});

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

(async function(){
    await dbConnection();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})()