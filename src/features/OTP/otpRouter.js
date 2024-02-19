import express from 'express';

import OtpControllers from './otpControllers.js';

const optRouter = express.Router();;
const otpControllers = new OtpControllers();

// + Send Otp Route
optRouter.post('/send', (req, res, next) => {
    otpControllers.sendOtpController(req, res, next);
})

export default optRouter;