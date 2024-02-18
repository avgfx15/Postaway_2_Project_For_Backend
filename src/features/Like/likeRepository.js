import { customErrorHandler } from "../../errorHandler/errorHandler.js"

import CommentModel from "../Comment/commentSchema.js"
import PostModel from "../Post/postSchema.js"
import LikeModel from "./likeSchema.js"


export default class LikesRepository {

    // + Add Like To Post
    addLikeToPostRepo = async (userId, likeableId) => {
        const findPost = await PostModel.findById({ _id: likeableId })
        if (!findPost) {
            throw new customErrorHandler(400, 'Post not found')
        } else {

            const newLike = new LikeModel({
                userId: userId,
                likeable: likeableId,
                on_model: 'Post'
            });
            const savedLike = await newLike.save();
            await findPost.likes.push(savedLike._id);
            const savedPost = await findPost.save();
            return { savedLike, savedPost };
        }
    }

    // + Add Like to Comment
    addLikeToCommentRepo = async (userId, likeableId) => {
        const findComment = await CommentModel.findById({ _id: likeableId });
        if (!findComment) {
            throw new customErrorHandler(400, 'Comment not found')
        } else {
            const newLike = new LikeModel({
                userId: userId,
                likeable: likeableId,
                on_model: 'Comments'
            });
            const savedLike = await newLike.save();
            await findComment.likes.push(savedLike._id);
            const savedComment = await findComment.save();
            return { savedLike, savedComment }
        }

    }

    // @ Get Like By Id

    getLikeByIdRepo = async (likeableId) => {
        const getLike = await LikeModel.findById({ _id: likeableId }).populate('userId', 'name email gender').populate('likeable');
        return getLike;
    }

    // - Delete Like By Id
    deleteLikeByIdRepo = async (userId, likeId) => {
        const findLike = await LikeModel.findOne({ _id: likeId, userId: userId });
        if (!findLike) {
            throw new customErrorHandler(400, 'Like not found');
        } else {
            if (findLike.on_model === 'Post') {
                const findPost = await PostModel.findOne({ _id: findLike.likeable });
                const findLikeIndex = await findPost.likes.indexOf(likeId)
                findPost.likes.splice(findLikeIndex, 1);
                await findPost.save();
            } else {
                const findComment = await CommentModel.findOne({ _id: findLike.likeable });
                const findLikeIndex = await findComment.likes.indexOf(likeId);
                findComment.likes.splice(findLikeIndex, 1);
                await findComment.save();
            }
            await LikeModel.findOneAndDelete({ _id: likeId, userId: userId })
        }
    }

}