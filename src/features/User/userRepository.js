import mongoose from 'mongoose';
import { customErrorHandler } from "../../errorHandler/errorHandler.js";
import UserModel from "./userSchema.js"



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
}