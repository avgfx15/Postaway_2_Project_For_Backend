import bcrypt from 'bcrypt';
import UserRepository from "./userRepository.js";

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
}