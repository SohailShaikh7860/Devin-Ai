import jwt from "jsonwebtoken";
import { redisClient } from "../services/Redis_Services.js";

const authUser = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ','');
        if(!token){
            return res.status(401).json({error:'Access denied. No token provided'});
        }

        const isBlacklisted = await redisClient.get(token);

        if (isBlacklisted) {
            res.cookies('token','');
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