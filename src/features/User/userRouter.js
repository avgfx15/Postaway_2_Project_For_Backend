import express from 'express';
import UserControllers from './userControllers.js';

const userRouter = express.Router();


const userControllers = new UserControllers();

//// All User Routers

// + User Register Route

userRouter.post('/signup', (req, res, next) => {
    userControllers.userSignUpControllers(req, res, next)
})





export default userRouter;