import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { customErrorHandler } from '../errorHandler/errorHandler.js';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    const secretKey = process.env.jwt_SECRET;
    if (!token) {
        return res.status(401).json({ success: false, message: 'You are not authorized to access' });
    }
    try {
        const payload = await jwt.verify(token, secretKey);
        req.user = payload;


    } catch (error) {
        return res.status(401).json({ success: false, message: 'You are not authorized to access' });
    }
    next();
}


export default authMiddleware;