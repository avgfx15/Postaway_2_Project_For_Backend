import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        expires: 3600,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const OTPModel = mongoose.model('Otp', otpSchema);

export default OTPModel;