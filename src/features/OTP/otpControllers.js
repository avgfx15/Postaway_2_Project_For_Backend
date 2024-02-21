import OtpRepository from "./otpRepository.js";

export default class OtpControllers {

    constructor() {
        this.otpRepo = new OtpRepository();
    }
    // + Send OTP

    sendOtpController = async (req, res, next) => {
        const { email } = req.body;
        console.log(email);
        try {
            const otpResp = await this.otpRepo.sendOtpRepo(email);
            return res.status(200).json({ success: otpResp.success, message: otpResp.message });
        } catch (error) {
            next(error)
        }
    };

    // + Verify OTP
    verifyOtpController = async (req, res, next) => {
        const { otp, email } = req.body;
        try {
            const otpResp = await this.otpRepo.verifyOtpRepo(otp, email);
            return res.status(200).json({ success: otpResp.success, message: otpResp.message, User: otpResp.User });
        } catch (error) {
            next(error)
        }
    };

    // + Reset Password
    resetPasswordController = async (req, res, next) => {
        const user = req.user;

        const { newPassword } = req.body;
        try {
            const response = await this.otpRepo.resetPasswordRepo(newPassword, user);
            return res.status(200).json({ success: response.success, message: response.message });
        } catch (error) {
            next(error)
        }
    }
}