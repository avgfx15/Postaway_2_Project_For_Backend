import mongoose from 'mongoose';
import PostModel from './postSchema.js';
import { customErrorHandler } from '../../errorHandler/errorHandler.js';


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

    // @ GET Post By PostId

    getPostByPostIdRepo = async (postId) => {
        const getPostByPostId = await PostModel.findById({ _id: postId });
        return getPostByPostId;
    }

    // * Update Post By User By Post Id
    updatePostByUserByPostIdRepo = async (userId, postId, update) => {
        const checkPostByUser = await PostModel.findOne({ userId: userId, _id: postId });
        if (!checkPostByUser) {
            throw new customErrorHandler(401, 'Post not Found')
        } else {
            const updatedPost = await PostModel.findOneAndUpdate({ userId: userId, _id: postId }, update, { new: true });
            return updatedPost;
        }
    }

    // - Delete Post By authorized User by PostId
    deletePostByAuthorizedUserByPostIdRepo = async (userId, postId) => {
        const findPost = await PostModel.findOne({ userId: userId, _id: postId });
        if (!findPost) {
            throw new customErrorHandler(401, 'Post not Found');
        } else {
            const deletePost = await PostModel.findOneAndDelete({ userId: userId, _id: postId });
        }
    }
}