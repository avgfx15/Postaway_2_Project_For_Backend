import nodeMailer from 'nodemailer';
import { customErrorHandler } from "../../errorHandler/errorHandler.js";
import UserModel from "../User/userSchema.js";
import bcrypt from 'bcrypt'

export default class OtpRepository {

    // + Send Otp

    sendOtpRepo = async (email) => {
        console.log('Repo call');
        const findUser = await UserModel.findOne({ email: email });

        if (!findUser) {
            throw new customErrorHandler(400, 'User not registered')
        } else {
            const mailTransporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'midbrainpower.mbp@gmail.com',
                    pass: 'qppl nfip czee hiwf ',
                }
            });
            // % Six Digit Random number generate
            const min = 100000;
            const max = 999999;
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            const mailOptions = {
                from: 'midbrainpower.mbp@gmail.com',
                to: email,
                subject: 'OTP for password reset',
                text: `Please use this OTP ${randomNumber} for reset your password`,
            };
            try {
                const result = mailTransporter.sendMail(mailOptions);

                findUser.otp = randomNumber;
                findUser.save();
                setTimeout(() => {
                    findUser.otp = null
                    findUser.save();
                }, 300000);
                return { success: true, message: 'OTP for password reset sent on your email address', response: result }
            } catch (error) {
                throw new customErrorHandler(400, 'Failed to send OTP for password reset')
            }
        }
    }

    // + Verify OTP
    verifyOtpRepo = async (otp, email) => {
        const findUser = await UserModel.findOne({ email: email, otp: otp }).select('name email');
        if (!findUser) {
            throw new customErrorHandler(400, 'Invalid Credentials')
        } else {
            return { success: true, message: "OTP verified successfully", User: findUser }
        }
    }

    // + Reset Password

    resetPasswordRepo = async (newPassword, user) => {

        const hashPassword = await bcrypt.hash(newPassword, 12);
        const findUser = await UserModel.findOne({ _id: user.userId });
        if (!findUser) {
            throw new customErrorHandler(400, 'User not found');
        } else {
            findUser.password = hashPassword;
            await findUser.save();
            return { success: true, message: 'Password reset successfully' }
        }


    }
}