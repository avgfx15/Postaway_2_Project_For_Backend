import { customErrorHandler } from "../../errorHandler/errorHandler.js";

import PostModel from "../Post/postSchema.js"
import CommentModel from "./commentSchema.js";


export default class CommentsRepository {
    // + Create New Comment

    createNewCommentRepo = async (userId, postId, content) => {
        const findPost = await PostModel.findOne({ _id: postId });
        if (!findPost) {
            throw new customErrorHandler(404, "Post not found")
        } else {
            const findCommentByUser = await CommentModel.findOne({ userId: userId, postId: postId });
            if (!findCommentByUser) {
                const newComment = new CommentModel({ content: content, userId: userId, postId: postId });
                const savedComment = await newComment.save();
                await findPost.comments.push(savedComment._id);
                await findPost.save();
                return { savedComment, findPost };
            } else {
                throw new customErrorHandler(401, 'You have already Comment on this post')
            }
        }
    }

    // @ GET Comment By PostId

    getCommentByPostIdRepo = async (postId) => {
        const getCommentByPostId = await PostModel.findById({ _id: postId }).populate('comments').populate('userId');
        return getCommentByPostId;
    }

    // * Update Comment By CommentId

    updateCommentByCommentIIdRepo = async (userId, commentId, content) => {
        const updateComment = await CommentModel.findOneAndUpdate({ _id: commentId, userId: userId }, { $set: { content: content } }, { new: true });
        if (!updateComment) {
            throw new customErrorHandler(401, 'You are not authorized to update')
        } else {
            return updateComment;
        }
    }
}