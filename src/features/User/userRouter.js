import express from 'express';
import UserControllers from './userControllers.js';
import { signUpFormValidator } from '../../middlewares/expressValidation.js';
import authMiddleware from '../../middlewares/authMiddleware.js';


const userRouter = express.Router();


const userControllers = new UserControllers();

//// All User Routers

// + User Register Route

userRouter.post('/signup', signUpFormValidator, (req, res, next) => {
    userControllers.userSignUpController(req, res, next)
});

// + User SignIn Route

userRouter.post('/signin', (req, res, next) => {
    userControllers.userSignInController(req, res, next)
})

// @ GET All Users details with out Password

userRouter.get('/getallusers', (req, res, next) => {
    userControllers.getAllUsersDetailsController(req, res, next)
})

// @ GET User details by userId without password

userRouter.get('/getuser/:id', (req, res, next) => {
    userControllers.getUserByIdController(req, res, next)
});

// * UPDATE User details by userId

userRouter.put('/updateuser', authMiddleware, (req, res, next) => {
    userControllers.updateUserDetailsController(req, res, next)
});

// @ Logout user
userRouter.get('/logout', authMiddleware, (req, res, next) => {
    userControllers.logoutUserController(req, res, next)
})





export default userRouter;