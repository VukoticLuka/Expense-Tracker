import jwt from 'jsonwebtoken';
import userModel from '../schemas/user.mjs';


export const handleLogout = async (request, response) => {
    const cookies = req.cookies;

    if(!cookies?.refreshToken){
        return response.sednStatus(204);
    }

    const refreshToken = cookies.refreshToken;

    //this is the part where i will delete refreshToken from redis db
    //TODO

    response.clearCookie("refreshToken", {httpOnly: true, sameSite: true});
    return response.sednStatus(204); 
}