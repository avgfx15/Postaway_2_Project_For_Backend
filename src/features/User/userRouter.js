import express from 'express';
import UserControllers from './userControllers.js';
import { signUpFormValidator } from '../../middlewares/expressValidation.js';

const userRouter = express.Router();


const userControllers = new UserControllers();

//// All User Routers

// + User Register Route

userRouter.post('/signup', signUpFormValidator, (req, res, next) => {
    userControllers.userSignUpControllers(req, res, next)
})





export default userRouter;