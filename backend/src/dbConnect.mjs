import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { envPath } from './utils/pathResolver.mjs';

dotenv.config({path: envPath})

const db_uri = process.env.DB_URI || "mongodb://localhost:27017/expenses";

const dbConnection = async () => {
    try{
        await mongoose.connect(db_uri);
        console.log('App successfully connected to mongodb database');
    }catch(error){
        console.error(`Error occured while connecting to db: ${error.message}`);
    }
}

export default dbConnection;