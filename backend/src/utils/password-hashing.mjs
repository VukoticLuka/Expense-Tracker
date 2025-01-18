import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { envPath } from "./pathResolver.mjs";

dotenv.config({path: envPath});

const saltRounds = parseInt(process.env.SALTROUNDS || 10);

export const hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }catch(error){
        console.error('Error hashing password:', error);
        throw error;
    }
}

export const checkPassword = async (plain, hashed) => {
    const match = await bcrypt.compare(plain, hashed);
    return match;
}



