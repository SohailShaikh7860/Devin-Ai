import jwt from "jsonwebtoken";
import { redisClient } from "../services/Redis_Services.js";

const authUser = async(req,res,next)=>{
    try {
        const authHeader = req.header('Authorization');
        const token = req.cookies.token || (authHeader ? authHeader.replace('Bearer ', '') : null);
        
        if(!token){
            return res.status(401).json({error:'Access denied. No token provided'});
        }

        const isBlacklisted = await redisClient.get(token);

        if (isBlacklisted) {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });
            return res.status(401).json({ error: 'Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({error:'Invalid token'});
    }
}

export {
    authUser
}