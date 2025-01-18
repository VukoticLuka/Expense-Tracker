import jwt from 'jsonwebtoken';
import userModel from '../schemas/user.mjs';
import { checkPassword } from '../utils/password-hashing.mjs';
import dotenv from 'dotenv';
import { envPath } from '../utils/pathResolver.mjs';

dotenv.config({path: envPath});

export const handleLogin = async (request, response) => {
    const {username, password} = request.body;

    if(!username || !password) return response.status(400).json({msg: "Username and password are required"});

    const user = await userModel.findOne({username: username});

    if(!user) return response.sendStatus(401); //Unauthorized

    const match = await checkPassword(password, user.password);

    if(!match) return response.sendStatus(401);

    const accessToken = jwt.sign(
            {"userId": user._id}, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
    const refreshToken = jwt.sign(
        {"userId": user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION});
    
    //redis db need to be added to store all refresh tokens
    
    response.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: true, maxAge: 1000 * 60 * 60 * 24});
    return response.status(200).json({accessToken});
}