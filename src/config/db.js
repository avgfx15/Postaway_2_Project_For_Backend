import mongoose from 'mongoose'

import dotenv from 'dotenv';

dotenv.config();


mongoose.Promise = global.Promise;
const dbUrl = process.env.dbURL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Database connection established');
    } catch (err) {
        console.log('Error in DB connection: ' + err)
    }
}
// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
// }, (err) => {
//     if (!err) {
//         console.log('MongoDB Connection Succeeded.')
//     } else {
//     }
// });

export default connectDB;

