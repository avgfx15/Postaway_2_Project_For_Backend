import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { customErrorHandler } from '../errorHandler/errorHandler.js';

dotenv.config();

const authModdleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    const secretKey = process.env.jwt_SECRET;
    if (!token) {
        throw new customErrorHandler(401, 'You are not authorized to access')
    }
    try {
        const payload = await jwt.verify(token, secretKey);
        req.user = payload;

    } catch (error) {
        throw new customErrorHandler(401, 'You are not authorized to access')
    }
    next();
}


export default authModdleware;