import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Wonders', 'Festivals', 'Amazing India', 'Interesting Facts', 'Education', 'IT', 'Technology', 'Gadgets', 'Others',]
    },
    keywords: [
        {
            type: String
        }
    ],
    images: [
        {
            type: String,
        }
    ],
    documents: [
        {
            type: String,
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ]
},
    { timestamps: true }
);

//Export the model
const PostModel = mongoose.model('Post', postSchema);

export default PostModel;