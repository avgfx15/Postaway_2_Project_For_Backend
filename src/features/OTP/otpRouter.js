import express from 'express';

import OtpControllers from './otpControllers.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const optRouter = express.Router();;
const otpControllers = new OtpControllers();

// + Send Otp Route
optRouter.post('/send', (req, res, next) => {
    otpControllers.sendOtpController(req, res, next);
});


// @ Verify OTP
optRouter.post('/verify', (req, res, next) => {
    otpControllers.verifyOtpController(req, res, next);
});

// + Reset Password
optRouter.post('/resetpassword', authMiddleware, (req, res, next) => {
    otpControllers.resetPasswordController(req, res, next);
})

export default optRouter;