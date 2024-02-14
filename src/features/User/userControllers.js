import bcrypt from 'bcrypt';
import UserRepository from "./userRepository.js";
import UserModel from './userSchema.js';

export default class UserControllers {

    constructor() {
        this.userRepo = new UserRepository();
    }

    // +  User SignUp 
    userSignUpController = async (req, res, next) => {

        try {
            const { name, email, password, gender } = req.body;
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = {
                name, email, password: hashPassword, gender
            }
            const userSaved = await this.userRepo.userSignUpRepo(newUser);
            return res.status(201).json({ success: true, message: 'User Saved Successfully', User: userSaved })
        } catch (err) {
            next(err)
        }
    }

    // + User SignIn

    userSignInController = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const response = await this.userRepo.userSignInRepo(email, password);

            // $ Store Token in Cookies

            res.cookie('jwtToken', response.token, {
                secure: true,
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.status(201).json({ success: true, User: response.sendUser, token: response.token })
        } catch (error) {
            next(error);
        }
    }

    // @ GET All Users Details

    getAllUsersDetailsController = async (req, res, next) => {
        try {
            const allUsers = await this.userRepo.getAllUsersDetailsRepo();
            return res.status(201).json({ success: true, Users: allUsers })
        } catch (error) {
            next(error);
        }
    }

    // @ GET User Details By User Id

    getUserByIdController = async (req, res, next) => {
        const id = req.params.id;
        try {
            const getUser = await this.userRepo.getUserByIdRepo(id);
            return res.status(201).json({ success: true, User: getUser })
        } catch (error) {
            next(error)
        }
    }

    // * Update User Details

    updateUserDetailsController = async (req, res, next) => {

        const user = req.user;
        try {
            const findUser = await UserModel.findById(user.userId);
            const { newName, newEmail, newPassword, newGender } = req.body;

            const hashNewPassword = await bcrypt.hash(newPassword, 12);

            const updateDetails = {
                name: newName ? newName : findUser.name,
                email: newEmail ? newEmail : findUser.email,
                password: newPassword ? hashNewPassword : findUser.password,
                gender: newGender ? newGender : findUser.gender,
            }
            const updatedUser = await this.userRepo.updateUserDetailsRepo(updateDetails, user);
            return res.status(201).json({ success: true, message: 'User Details Updated Successfully', User: updatedUser })
        } catch (error) {
            next(error)
        }
    }
}