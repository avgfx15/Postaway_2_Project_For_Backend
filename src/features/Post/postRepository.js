import mongoose from 'mongoose';
import PostModel from './postSchema.js';


export default class PostRepository {

    // + Create New Post

    createNewPostRepo = async (user, newPost) => {
        const createPost = new PostModel(newPost)
        const savedPost = createPost.save();
        return savedPost;
    }

    // @ GET All Post

    getAllPostsRepo = async () => {
        const allPosts = await PostModel.find();
        return allPosts;
    }

    // @ GET All Post By Specific User
    getAllPostByUserRepo = async (userId) => {
        const getPostByUser = await PostModel.find({ userId: userId });
        return getPostByUser;
    }

}