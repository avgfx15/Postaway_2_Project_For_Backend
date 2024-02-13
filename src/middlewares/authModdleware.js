import jwt from 'jsonwebtoken';
import { customErrorHandler } from '../errorHandler/errorHandler.js';

const authModdleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    const secretKey = process.env.jwtSECRET;
    if (!token) {
        throw new customErrorHandler(401, 'You are not authorized to access')
    }
    try {
        const payload = await jwt.verify(token, secretKey);
        req.user = payload.user;
    } catch (error) {
        throw new customErrorHandler(401, 'You are not authorized to access')
    }
    next();
}


export default authModdleware;