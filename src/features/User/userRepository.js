import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { customErrorHandler } from "../../errorHandler/errorHandler.js";
import UserModel from "./userSchema.js"
import { logger } from '../../middlewares/loggerMiddleware.js';



export default class UserRepository {

    // + User SignUp

    userSignUpRepo = async (newUser) => {
        try {
            const userSignUp = new UserModel(newUser)
            const userSaved = await userSignUp.save();
            return userSaved;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error;
            } else {
                throw new customErrorHandler(401, 'User not registered')
            }
        }
    }

    // + User SignIn

    userSignInRepo = async (email, password) => {
        //$ Find User By Email
        const findUser = await UserModel.findOne({ email: email });

        if (!findUser) {
            throw new customErrorHandler(401, 'User not found')
        } else {
            // $ Check Password is valid or not
            const validCredentials = await bcrypt.compare(password, findUser.password)
            if (!validCredentials) {
                throw new customErrorHandler(401, 'Invalid Credentials')
            } else {
                // $ Create Token 
                const secretKey = process.env.jwt_SECRET;
                const token = jwt.sign({ userId: findUser._id, email: findUser.email }, secretKey, { expiresIn: '1h' });
                const sendUser = await UserModel.findOne({ email: email }).select('name email');

                return { sendUser, token }
            }
        }
    }
}