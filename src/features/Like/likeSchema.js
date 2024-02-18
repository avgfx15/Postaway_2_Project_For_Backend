import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model'
    },
    on_model: {
        type: String,
        enum: ['Post', 'Comments']
    }
});

const LikeModel = mongoose.model('Likes', likeSchema)

export default LikeModel;