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
                return { savedComment, findPost };
            } else {
                throw new customErrorHandler(401, 'You have already Comment on this post')
            }
        }
    }
}