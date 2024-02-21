import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your Name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your Email'],
        unique: [true, 'User already exists'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Password must be at least 6 characters long']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Transgender']
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friends'
        }
    ],
    resetLink: {
        data: String,
    },
    otp: {
        type: Number,
    }
}, { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;