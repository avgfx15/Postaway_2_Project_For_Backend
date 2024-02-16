import mongoose from 'mongoose';
import PostModel from './postSchema.js';


export default class PostRepository {

    // + Create New Post

    createNewPostRepo = async (user, newPost) => {
        const createPost = new PostModel(newPost)
        const savedPost = createPost.save();        
        return savedPost;
    }

}