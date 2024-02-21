import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

    // @ GET All Users Detalis

    getAllUsersDetailsRepo = async () => {
        const allUsers = await UserModel.find().select('name email');
        if (!allUsers) {
            throw new customErrorHandler(401, 'No users found')
        } else {
            return allUsers;
        }
    }

    // @ GET User By Id

    getUserByIdRepo = async (id) => {
        const getUser = await UserModel.findById(id).select('name email');
        if (!getUser) {
            throw new customErrorHandler(401, 'User not  found')
        } else {
            return getUser
        }
    }

    // * UPDATE User Details

    updateUserDetailsRepo = async (updateDetails, user) => {
        const updateUser = await UserModel.findByIdAndUpdate({ _id: user.userId }, updateDetails, { new: true });
        if (!updateUser) {
            throw new customErrorHandler(401, 'User not updated')
        } else {
            return updateUser;
        }
    };

    // @ Logout
    logoutUserRepo = async (user) => {
        const findUser = await UserModel.findById({ _id: user.userId });
        if (!findUser) {
            throw new customErrorHandler(401, 'User not found');
        } else {

        }
    }
}