import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { envPath } from '../utils/pathResolver.mjs';

dotenv.config({path: envPath});

export const autheticateToken = async (request, response ,next) => {
    const authHeader = request.headers['authorization'];

    const token = authHeader?.split(' ')[1];

    if(!token) return response.sendStatus(401);

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if(err || err instanceof jwt.TokenExpiredError){
                const cookies = request.cookies;
                if(!cookies?.refreshToken) return response.sendStatus(401);

                jwt.verify(
                    cookies.refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    (err, decodedUser) => {
                        if(err) return response.sendStatus(403);

                        const newAccessToken = jwt.sign(
                            {"userId": decodedUser._id},
                            process.env.ACCESS_TOKEN_SECRET,
                            {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION}
                        )

                        return response.status(200).json({newAccessToken});
                    }
                )
            }
            else if(err){
                return response.sendStatus(403);
            }
            else{
                request.user = user;
                next();
            }
        }
    )
}