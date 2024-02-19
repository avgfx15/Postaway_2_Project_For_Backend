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
    }
}