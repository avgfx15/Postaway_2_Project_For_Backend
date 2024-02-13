import bcrypt from 'bcrypt';
import UserRepository from "./userRepository.js";

export default class UserControllers {

    constructor() {
        this.userRepo = new UserRepository();
    }

    // +  User SignUp 
    userSignUpControllers = async (req, res, next) => {

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
}