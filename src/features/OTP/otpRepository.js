import nodeMailer from 'nodemailer';
import { customErrorHandler } from "../../errorHandler/errorHandler.js";
import UserModel from "../User/userSchema.js"
import OTPModel from './otpSchema.js';

export default class OtpRepository {

    // + Send Otp

    sendOtpRepo = async (email) => {
        console.log('Repo call');
        const findUser = await UserModel.findOne({ email: email });
        console.log(findUser);
        if (!findUser) {
            throw new customErrorHandler(400, 'User not registered')
        } else {
            const mailTransporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'codingninjas2k16@gmail.com',
                    pass: 'slwvvlczduktvhdj',
                }
            });
            // % Six Digit Random number generate
            const min = 100000;
            const max = 999999;
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log(randomNumber);
            const mailOptions = {
                from: 'codingninjas2k16@gmail.com',
                to: email,
                subject: 'OTP for password reset',
                text: `Please use this OTP ${randomNumber} for reset your password`,
            };
            try {
                const result = mailTransporter.sendMail(mailOptions);
                const newOtp = new OTPModel({
                    otp: randomNumber,
                    user: findUser._id
                })
                await newOtp.save();
                return { success: true, message: 'OTP for password reset sent on your email address', response: result }
            } catch (error) {
                throw new customErrorHandler(400, 'Failed to send OTP for password reset')
            }
        }
    }
}